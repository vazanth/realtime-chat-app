import app from './app';
import http from 'http';
import { config } from './config';
import initializeSocket from './socket';
import { Server as SocketIOServer } from 'socket.io';

const PORT = Number(config.SERVER_PORT);

const server = http.createServer(app);

export const io = new SocketIOServer(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:5173',
  },
});

initializeSocket(io);

server.listen(PORT, () => {
  console.log(`Express Server started successfully on port: ${PORT} 🚀🚀🚀`);
});

export default server;
