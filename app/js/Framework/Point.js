/**
 * A single point.
 * @param {Object} options Options for this point.
 */
function Point(options) {
  if(!options) {
    options = {}; //failsafe.
  }
  this.x = (options.x || 0);
  this.y = (options.y || 0);
  this.color = (options.color || "#000");
}

Point.prototype.setColor = function (color) {
  this.color = color;
};

module.exports = Point;
