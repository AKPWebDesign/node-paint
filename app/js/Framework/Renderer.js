function Renderer(ctx, game) {
  this.ctx = ctx;
  this.game = game;
}

Renderer.prototype.drawLine = function (line) {
  if(!line.getPoints().length) {return false;}

  this.ctx.lineJoin = "round";
  this.ctx.lineCap = "round";
  this.ctx.lineWidth = line.width;
  this.ctx.beginPath();
  for (var i = 0; i < line.getPoints().length; i++) {
    var pt = line.getPoints()[i];
    this.ctx.strokeStyle = (line.color || pt.color || "#000"); // '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    if(i == 0) {
      this.ctx.moveTo(pt.x, pt.y);
      if(line.getPoints().length == 1) {
        this.ctx.lineTo(pt.x+0.1, pt.y+0.1);
      }
    } else {
      this.ctx.lineTo(pt.x, pt.y);
    }
  }
  this.ctx.stroke();
};

Renderer.prototype.drawText = function (text, point) {
  this.ctx.font = "32px 'Courier New'";
  this.ctx.fillText(text, point.x, point.y);
};

Renderer.prototype.setLineWidth = function (width) {
  this.ctx.lineWidth = width;
};

module.exports = Renderer;
