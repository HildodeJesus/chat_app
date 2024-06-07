import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
} from '../interfaces/chat.interface';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();
  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  async handleEvent(@MessageBody() payload: Message) {
    this.logger.log(payload);
    this.server.emit('chat', payload);
    return payload;
  }
}
