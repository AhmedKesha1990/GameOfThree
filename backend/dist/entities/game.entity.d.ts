import { Player } from './play.entity';
import { Movement } from './movement.entity';
export declare enum GameStatus {
    INPROGRESS = "inprogress",
    COMPLETED = "completed"
}
export declare class Game {
    id?: number;
    player1: Player;
    player2: Player;
    status: string;
    movements?: Movement[];
}
