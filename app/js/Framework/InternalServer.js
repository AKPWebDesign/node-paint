function InternalServer() {
  this.server = require('http').createServer();
  this.io = require('socket.io')(this.server);
  this.fs = require('fs');
  this.port = 0;

  this.lines = [];
}

InternalServer.prototype.goGoGo = function (callback) {
  this.server.listen(this.port);

  var self = this;
  this.server.on('listening', function(){
    console.log("Internal server listening on port " + self.server.address().port + ".");
    self.port = self.server.address().port;
    callback(self.port);
  });

  this.io.on('connection', function(socket) {
    socket.emit('hello', {lines: this.lines});

    var self = this;
    socket.on('server-save-event', function(data) {
      if(!data.line){return;}
      this.lines.push(data.line);
    });
  });
};

module.exports = InternalServer;
