import { Game } from './game.entity';
import { Player } from './play.entity';
export declare class Movement {
    id?: number;
    player: Player;
    value: number;
    valueAdded: number;
    possibilities: string;
    isLast: boolean;
    oldValue: number;
    game: Game;
}
