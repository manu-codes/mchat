const http = require('http');
const server = http.createServer();
const socket_io = require('socket.io');
const chat = require('./chat-handler');
server.listen(3000);
console.log('listening at 3000');

var io = socket_io();
io.attach(server);

io.on('connection', function (socket) {
  console.log("Socket connected: " + socket.id);
  socket.on('action', (action) => {
    try {
      chat.handle(socket, io, action);
    }
    catch (e) {
      console.log(e);
    }
  });
  socket.on('disconnect', function () {
    chat.removeUser(socket, io)
  });
});