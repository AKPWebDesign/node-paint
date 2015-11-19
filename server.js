var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');

var lines = [];

app.listen(8080);

io.on('connection', function(socket) {
  socket.emit('hello', {lines: lines});

  socket.on('server-save-event', function(data) {
    if(!data.line){return;}
    lines.push(data.line);
  });
});
