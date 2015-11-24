'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
const ipcMain = require('electron').ipcMain;

var Server = require('./app/js/Framework/Server');

var mainWindow = null;
var internalServer = null;
var internalServerPort = 0;

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    minWidth: 800,
    minHeight: 600,
    title: "NodePaint "+getVersionString(),
    //icon: //https://github.com/atom/electron/blob/master/docs/api/native-image.md
    frame: false
  });

  mainWindow.loadUrl('file://' + __dirname + '/app/main_menu.html');
  mainWindow.openDevTools();
});

ipcMain.on('close-main-window', function() {
  app.quit();
});

ipcMain.on('minimize-main-window', function() {
  mainWindow.minimize();
});

ipcMain.on('maximize-main-window', function() {
  (mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize());
});

ipcMain.on('load-game', function() {
  mainWindow.loadUrl('file://' + __dirname + '/app/game.html');
});

ipcMain.on('load-internal-server', function() {
  internalServer = new Server({});
  internalServer.goGoGo(function(port) {
    internalServerPort = port;
  });
});

ipcMain.on('load-server-browser', function() {
  mainWindow.loadUrl('file://' + __dirname + '/app/server_browser.html');
});

ipcMain.on('load-main-menu', function() {
  mainWindow.loadUrl('file://' + __dirname + '/app/main_menu.html');
});

ipcMain.on('get-game-address', function() {
  mainWindow.webContents.send('game-address', "localhost:"+internalServerPort);
});

function getVersionString() {
  return "v"+require('./package.json').version;
}
