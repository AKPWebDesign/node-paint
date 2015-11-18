/**
 * A line.
 * @param {Point[]} points  Optional. An array of points.
 * @param {Object}  options Optional. The options to use for this line.
 */
function Line(points, options) {
  this.points = [];
  this.color = "#000";
  this.width = 5;

  if(points && points.length) {
    this.points = points;
  }

  if(options) {
    this.color = options.color;
    this.width = options.width;
  }
}

Line.prototype.getLength = function () {
  return this.points.length;
};

Line.prototype.getPoints = function () {
  return this.points;
};

Line.prototype.addPoint = function (point) {
  this.points.push(point);
};

module.exports = Line;
