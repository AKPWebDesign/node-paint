var game = null;

$(document).ready(function(){
  canvas = document.getElementById("gameCanvas");
  ipcRenderer.send('get-game-address');
  ipcRenderer.on('game-address', function(event, data) {
    console.log(data);
    //load socket.io
    var scr = document.createElement('script'),
        head = document.head || document.getElementsByTagName('head')[0];
    scr.setAttribute('type', 'text/javascript');
    scr.src = "http://"+data+"/socket.io/socket.io.js";
    scr.async = false;
    head.insertBefore(scr, head.firstChild);

    setTimeout(function(){
      game = new Game(canvas, data);
    }, 100);
  });
});
