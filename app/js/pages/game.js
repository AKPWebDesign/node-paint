var game = null;

$(document).ready(function(){
  canvas = document.getElementById("gameCanvas");
  ipcRenderer.send('get-game-address');
  ipcRenderer.on('game-address', function(event, data) {
    game = new Game(canvas, data);
  });
});
