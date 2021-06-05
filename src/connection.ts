import { Logger } from "@nestjs/common";

export interface Message {
    event: string;
    data: string;
    channel: string;
}

export class Connection {
    private readonly logger = new Logger(Connection.name);

    private socket: any;

    constructor(socket: any) {
        this.socket = socket;
    }

    public emit(event: string, data: object, channel: string|null) {
        var message: Message = {
            event: event,
            data: JSON.stringify(data),
            channel: channel
        };

        this.logger.log(`Emitting ${message} to ${this.getSocketId()}`);
        this.socket.send(JSON.stringify(message));
    }

    public getSocketId(): number {
        var parts = JSON.stringify(this.socket);
        this.logger.log(parts);
        return 1;
        /*
        parts = socket.object_id.to_s.chars
        parts = parts.each_slice((parts.length / 2.0).ceil).to_a
        [parts.first.join, parts.last.join].join(".")
        */

    }
}
