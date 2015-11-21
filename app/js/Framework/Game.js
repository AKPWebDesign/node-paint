function Game(canvas, address) {
  this.canvas = canvas;
  this.ctx = null;
  this.isPainting = false;
  this.currentLine = new Line();
  this.lines = [];
  this.socket = null;
  this.gameAddress = address;

  //prepare the canvas and context.
  this.setupCanvas(this.canvas);

  this.renderer = new Renderer(this.ctx, this);
  this.debugInfo = new DebugInfo(this.renderer);

  this.debug = true;

  //save this for access in setInterval.
  var self = this;

  //set off game update loop.
  setInterval(function() {
    self.update.call(self);
    self.draw.call(self);
  }, 0);

  //set up the event handlers.
  this.setupEvents();
}

/**
 * The game update loop.
 * This runs every JS frame, if possible.
 */
Game.prototype.update = function () {
  //update point count for debug display.
  var points = 0;
  for (var i = 0; i < this.lines.length; i++) {
    points += this.lines[i].getLength();
  }
  points += this.currentLine.getLength();
  this.debugInfo.updatePointCount(points);
  this.debugInfo.updateLineCount(this.lines.length + (this.currentLine.points.length ? 1 : 0));
  this.debugInfo.fpsTracker.loop();
};

/**
 * The draw loop. Happens just after update.
 */
Game.prototype.draw = function () {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); //clear the canvas.
  //draw every line.
  for (var i = 0; i < this.lines.length; i++) {
    this.renderer.drawLine(this.lines[i]);
  }
  //also draw the current line.
  this.renderer.drawLine(this.currentLine);

  if(this.debug) {
    this.debugInfo.draw();
  }
};

////////////////////////////////////////////////////////////////////////////////
/// Events
////////////////////////////////////////////////////////////////////////////////

/**
 * onMouseUp Event.
 * Ends the current line, pushes it to the lines array.
 */
Game.prototype.onMouseUp = function () {
  this.isPainting = false;
  if(this.currentLine.getLength()) {
    this.lines.push(this.currentLine);
    this.currentLine = new Line();

    //trigger server-side save of canvas.
    this.triggerServerSave(this.currentLine);
  }
};

/**
 * onMouseMove Event.
 * Adds points to the current line for display.
 *
 * @param  {Event} e The event we caught.
 */
Game.prototype.onMouseMove = function (e) {
  var point = this.makePointFromEvent(e);
  if(this.isPainting) {
    this.currentLine.addPoint(point);
  }

  this.debugInfo.updateMouseCoords(point);
};

/**
 * onMouseDown Event.
 * Starts the current line, adding the current mouse location as the first
 * point.
 *
 * @param  {Event} e The event we caught.
 */
Game.prototype.onMouseDown = function (e) {
  var point = this.makePointFromEvent(e);
  this.isPainting = true;
  this.currentLine.addPoint(point);
};

////////////////////////////////////////////////////////////////////////////////
/// Helpers
////////////////////////////////////////////////////////////////////////////////

/**
 * Makes a point, using a mouse event for the coordinates.
 * @param  {Event} e The event to use.
 * @return {Point}   The point we created.
 */
Game.prototype.makePointFromEvent = function (e) {
  //set point x and y based on our actual location in the window.
  var x = e.clientX - this.canvas.offsetLeft;
  var y = e.clientY - this.canvas.offsetTop;
  return new Point({x:x, y:y});
};

/**
 * Sets up the canvas, preparing it for rendering. Also sets our context
 * variable.
 * @param  {DOMElement} canvas The canvas our game is using.
 */
Game.prototype.setupCanvas = function (canvas) {
  //add window resize event to be sure canvas is always the proper size.
  //run the resize event immediately, to make sure the canvas is sized right.
  $(window).resize(function(){
    //set the canvas height and width to the same as our functional window space.
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }).resize();

  this.ctx = canvas.getContext('2d');
};

/**
 * Sets up the mouse events needed for the game to function properly.
 */
Game.prototype.setupEvents = function () {
  //define self, for access within event handlers.
  var self = this;

  //for canvas and footerContainer, add mouseup and mousemove events.
  $(this.canvas, ".footerContainer").each(function(){
    $(this).mouseup(function(){
      self.onMouseUp.call(self);
    });
    $(this).mousemove(function(e){
      self.onMouseMove.call(self,e);
    });
  });

  //add canvas mousedown event separately, because we don't want footerContainer to have it.
  $(this.canvas).mousedown(function(e){
    self.onMouseDown.call(self,e);
  });

  //connect socket.
  this.socket = io('http://'+this.gameAddress);

  //on a hello event from the socket.
  this.socket.on('hello', function(data) {
    if(!data.lines) {return;}
    for (var i = 0; i < data.lines.length; i++) {
      var pts = [];
      var l = data.lines[i];
      for (var j = 0; j < l.points.length; j++) {
        var pt = l.points[j];
        pts.push(new Point({x:pt.x, y:pt.y, color:pt.color}));
      }

      self.lines.push(new Line(pts, {color: l.color, width: l.width}));
    }
  });
};

Game.prototype.triggerServerSave = function (line) {
  this.socket.emit('server-save-event', {line: line});
};

module.exports = Game;
