const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const setupSchedule = require('./routes/schedule');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "UPDATE"],
        credentials: true
    }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const vesselRoutes = require('./routes/vessels');
app.use('/api/vessels', vesselRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setupSchedule(io);
});
