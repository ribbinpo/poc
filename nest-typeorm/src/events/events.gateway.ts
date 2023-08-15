import {
  BaseWsExceptionFilter,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway(80, {
  cors: { origin: '*' },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // @UseFilters(new BaseWsExceptionFilter())

  // ValidationPipe
  // @UsePipes(new ValidationPipe())

  // Guards
  // @UseGuards(AuthGuard)

  @SubscribeMessage('events')
  findAll(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<number>> {
    // Note: using client when want to emit event in specific channels
    client.emit('test', { name: 'baab' }, (data) => console.log(data));
    // Note: it has return to 'events' channel
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  // @SubscribeMessage('events')
  // handleEvent(client: Socket, data: string): string {
  //   return data;
  // }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number) {
    return data;
  }
}
