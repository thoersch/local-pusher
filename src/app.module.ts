import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';

@Module({
  imports: [EventsModule],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
