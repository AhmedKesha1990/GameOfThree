import 'reflect-metadata';
import { createServer, Server } from "http";
import { createExpressServer } from 'routing-controllers';
import { Server as SocketGatewayServer } from "socket.io";
import { GameController, PlayerController } from '@src/controllers'
import { DB } from '@src/app-data-source'
import { useSocketServer } from 'socket-controllers';


DB.initialize();

const app = createExpressServer({
  controllers: [PlayerController, GameController],
  validation: true
});

const httpServer: Server = createServer(app);
const io: SocketGatewayServer = new SocketGatewayServer(httpServer);

useSocketServer(io, {
  controllers: [PlayerController, GameController],
});

const PORT = process.env.PORT || 8000


httpServer.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`)
})
