import { Session } from './session.entity';
export declare enum PlayerStatus {
    ONLINE = "online",
    OFFLINE = "offline"
}
export declare class Player {
    id?: number;
    name: string;
    status: string;
    sessions?: Session[];
}
