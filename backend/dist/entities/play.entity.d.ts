import { Game } from './game.entity';
import { Session } from './session.entity';
import { Movement } from './movement.entity';
export declare enum PlayerStatus {
    ONLINE = "online",
    OFFLINE = "offline"
}
export declare class Player {
    id?: number;
    name: string;
    status: string;
    sessions?: Session[];
    games?: Game[];
    movements?: Movement[];
}
