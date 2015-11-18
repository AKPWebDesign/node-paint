var game = null;

$(document).ready(function(){
  canvas = document.getElementById("gameCanvas");
  game = new Game(canvas);
});
