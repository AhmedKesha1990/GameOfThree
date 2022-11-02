import { Player } from '@src/entities/play.entity';
import { Repository } from 'typeorm';
export declare class PlayerService {
    playerRepository: Repository<Player>;
    constructor();
    getPlayer(playerId: number): Promise<Player>;
    createPlayer(): Promise<Player>;
    join(playerId: number): Promise<Player>;
    fetchPlayers(): {
        id: number;
    }[];
}
