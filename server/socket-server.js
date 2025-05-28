const { Server } = require('socket.io');

const io = new Server(4000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('taskCreated', (task) => {
    console.log('Broadcasting taskCreated:', task);
    socket.broadcast.emit('taskCreated', task);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

console.log('Socket.IO server running on port 4000'); 