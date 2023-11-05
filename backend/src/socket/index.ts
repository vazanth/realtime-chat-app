import { Server } from 'socket.io';
import chat from './chat';

function initializeSocket(io: Server) {
  io.on('connection', (socket) => {
    chat(io, socket);
  });
}

export default initializeSocket;
