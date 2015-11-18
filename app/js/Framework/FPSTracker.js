function FPSTracker() {
  this.lastLoop = new Date;
  this.currentFPS = 0;
}

FPSTracker.prototype.loop = function () {
  var thisLoop = new Date;
  this.currentFPS = Math.floor(1000 / (thisLoop - this.lastLoop));
  this.lastLoop = thisLoop;
};

FPSTracker.prototype.getFPS = function () {
  return this.currentFPS;
};

module.exports = FPSTracker;
