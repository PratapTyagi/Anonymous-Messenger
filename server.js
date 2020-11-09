const io = require("socket.io")(89);

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', message => {
    socket.broadcast.emit('receive', {msg: message, name: users[socket.id]});
  });

  socket.on('disconnect', data => {
    socket.broadcast.emit('user-left', users[socket.id]);
    delete users[socket.id];
  });

});