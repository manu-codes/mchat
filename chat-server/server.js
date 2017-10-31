const http = require('http');
const server = http.createServer();
const socket_io = require('socket.io');
const chat=require('./chat-handler');
server.listen(3000);
console.log('listening at 3000');

var io = socket_io();
io.attach(server);

io.on('connection', function (socket) {
  console.log("Socket connected: " + socket.id);
  socket.on('action', (action) => {
    if (action.type === 'server/hello') {
      socket.emit('action', { type: 'message', data: 'entered' });
    }
    console.log('init at')
    console.log(action)
    
    chat.handle(socket, action);
  });
});