$(document).ready(function(){
  var titlebar = require('titlebar');
  var t = titlebar();

  //append to titlebar element, if it exists, otherwise append to body.
  if($(".titlebar").length) {
    t.appendTo($(".titlebar").get(0));
  } else {
    t.appendTo(document.body);
  }

  $(".titlebar-close").click(function(){
    ipcRenderer.send('close-main-window');
  });

  $(".titlebar-minimize").click(function(){
    ipcRenderer.send('minimize-main-window');
  });

  $(".titlebar-fullscreen").click(function(){
    ipcRenderer.send('maximize-main-window');
  });
});
