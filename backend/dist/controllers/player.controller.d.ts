import { PlayerService } from '@src/services/player.service';
import { SessionService } from '@src/services/session.service';
import { Socket } from 'socket.io';
export declare class PlayerController {
    playerService: PlayerService;
    sessionService: SessionService;
    join(message: {
        playerId: number;
    }, socket: Socket): Promise<import("../entities/session.entity").Session>;
    connect(socket: Socket): Promise<void>;
    leave(socket: Socket): Promise<void>;
    getAll(): Promise<import("@src/entities/play.entity").Player[]>;
}
