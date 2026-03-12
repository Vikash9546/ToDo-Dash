import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let currentTasks = null;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send the latest state to the newly connected user
  if (currentTasks) {
    socket.emit('sync_state', currentTasks);
  }

  socket.on('redux_action', (data) => {
    const { action, tasksState } = data;
    // Cache the latest tasks state
    if (tasksState) {
      currentTasks = tasksState;
    }
    
    // Broadcast the action to all other connected clients
    socket.broadcast.emit('redux_action', action);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running closely on http://localhost:${PORT}`);
});
