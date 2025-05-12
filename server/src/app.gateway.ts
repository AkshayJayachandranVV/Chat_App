import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: 'http://localhost:4200', 
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })
  export class AppGateway implements OnGatewayInit, OnGatewayConnection {
    @WebSocketServer()
    server: Server;
    
    private logger: Logger = new Logger('AppGateway');
    private messages: string[] = []; 

    afterInit(server: Server) {
      this.logger.log('Socket.io initialized');
    }
    
    handleConnection(client: Socket) {
      this.logger.log(`Connection is established: ${client.id}`);
    }


    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket) {
      this.logger.log(`Received message: ${message}`);
      this.messages.push(message);
      this.server.emit('receiveMessage', message);  
    }
    
    
  }    
  