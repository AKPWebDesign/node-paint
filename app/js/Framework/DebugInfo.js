function DebugInfo(renderer) {
  this.renderer = renderer;
  this.pointCount = 0;
  this.lineCount = 0;
  this.mouseCoords = new Point();
  this.fpsTracker = new FPSTracker();
}

DebugInfo.prototype.addPoint = function () {
  this.pointCount++;
};

DebugInfo.prototype.updateMouseCoords = function (point) {
  this.mouseCoords = point;
};

DebugInfo.prototype.updateLineCount = function (lines) {
  this.lineCount = lines;
};

DebugInfo.prototype.draw = function () {
  this.renderer.drawText(`Debug info:`, new Point({x:0, y:25}));
  this.renderer.drawText(`FPS: ${this.fpsTracker.getFPS()}`, new Point({x:0, y:50}));
  this.renderer.drawText(`Lines: ${this.lineCount}`, new Point({x:0, y:75}));
  this.renderer.drawText(`Points: ${this.pointCount}`, new Point({x:0, y:100}));
  this.renderer.drawText(`Mouse: x:${this.mouseCoords.x}, y:${this.mouseCoords.y}`, new Point({x:0, y:125}));
};

module.exports = DebugInfo;
