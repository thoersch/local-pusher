import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);
  private readonly CLIENT_EVENT_PREFIX = "client-";

  handleDisconnect(client: any) {
    this.logger.debug(`Disconnected: ${client.id}`);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.debug(`Connection: ${client.id} with args ${JSON.stringify(args)}`);
    const established = "pusher:connection_established";
    client.emit(established, {event: established, socket_id: client.id, activity_timeout: 120});
  }
  

  @SubscribeMessage('*')
  async process(@MessageBody() body: any): Promise<any> {
    this.logger.log("CLIENT MESSAGE: " + JSON.stringify(body));

    if (body.data[0].indexOf(this.CLIENT_EVENT_PREFIX) == 0) {
      return { event: 'events', data: body.data[1] };
    }
    
    return;
  }

  @SubscribeMessage('pusher:subscribe')
  async subscribe(@MessageBody() data: any): Promise<any> {
    //todo: sub to channel
    return { event: 'pusher:subscribe', data: true };
  }

  @SubscribeMessage('pusher:unsubscribe')
  async unsubscribe(@MessageBody() data: any): Promise<any> {
    //todo: unsub from channel
    return { event: 'pusher:unsubscribe', data: true };
  }

  @SubscribeMessage('pusher:ping')
  async pingPong(@MessageBody() data: string): Promise<string> {
    return "pusher:pong";
  }

}
