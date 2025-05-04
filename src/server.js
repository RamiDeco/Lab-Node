import 'dotenv/config';
import server from './app.js';
import {Server} from 'socket.io';

const PORT = process.env.PORT || 3000;

//WebSocket
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // o donde esté tu frontend
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
  });

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
