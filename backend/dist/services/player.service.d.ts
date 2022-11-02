import { Player } from '@src/entities/play.entity';
import { Repository } from 'typeorm';
export declare class PlayerService {
    playerRepository: Repository<Player>;
    constructor();
    getPlayer(playerId: number): Promise<Player>;
    createPlayer(): Promise<Player>;
    updatePlayer(player: Player): Promise<Player>;
    join(playerId: number): Promise<{
        player: Player;
        newPlayer: boolean;
    }>;
    fetchPlayers(): Promise<Player[]>;
}
