import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AppController } from './app.controller';

@Module({
  imports: [EventsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
