$(document).ready(function(){

  $("#quit-button").click(function(){
    ipcRenderer.send('close-main-window');
  });

  $("#singleplayer-button").click(function(){
    ipcRenderer.send('load-internal-server');
    ipcRenderer.send('load-game');
  });
});
