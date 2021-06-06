import { Controller, Get } from '@nestjs/common';

@Controller('events')
export class EventsController {
    @Get()
    findAll(): string {
        return 'This action returns all events';
    }
}
