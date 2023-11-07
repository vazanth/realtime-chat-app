import { Server, Socket } from 'socket.io';
import { generateRandomId } from '../helpers/common';

function chat(io: Server, socket: Socket): void {
  socket.on('joinChat', (roomId) => {
    socket.join(roomId);
  });

  socket.on('privateChatMessage', ({ message, username, room }) => {
    io.to(room).emit('privateMessage', {
      id: generateRandomId(21),
      sender: username,
      content: message,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));
}

export default chat;
