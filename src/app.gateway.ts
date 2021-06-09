import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(AppGateway.name);

  handleDisconnect(client: any) {
    this.logger.debug(`App Gateway Disconnected: ${client.id}`);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.debug(`App Gateway Connection: ${client.id} with args ${JSON.stringify(args)}`);
    const established = "pusher:connection_established";
    client.emit(established, {event: established, socket_id: client.id, activity_timeout: 120});
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
