import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(81, { namespace: '/chat' })
export class ChatsGateway {
  @WebSocketServer() server: Server;

  // afterInit(): void {
  //   console.log('Websocket Gateway Initialized.');
  // }

  handleConnection(client: Socket) {
    console.log(`New client connected: ${client.id}`);
  }

  // handleDisconnect(client: Socket) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data.room);
    client.join(data.room);
    client.emit('message', `You joined room: ${data.room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ): void {
    client.leave(data.room);
    client.emit('message', `You left room: ${data.room}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { room: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    // client.to(data.room).emit('message', data.message);
    this.server.to(data.room).emit('message', data.message);
  }
}
