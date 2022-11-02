import { Player } from '@src/entities/play.entity';
import { AddMovementDTO, InitGameDTO } from '@src/dto';
import { Game } from '@src/entities/game.entity';
import { Movement } from '@src/entities/movement.entity';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { PlayerService } from './player.service';
import { SessionService } from './session.service';
export declare class GameService {
    playerService: PlayerService;
    sessionService: SessionService;
    gameRepository: Repository<Game>;
    movementRepository: Repository<Movement>;
    constructor();
    init(input: InitGameDTO): Promise<Game>;
    loadGamePlayers(input: {
        playerOneId: number;
        playerTwoId: number;
    }): Promise<{
        player1: Player;
        player2: Player;
    }>;
    createGame(input: {
        player1: Player;
        player2: Player;
    }): Promise<Game>;
    loadGame(input: {
        player1: Player;
        player2: Player;
    }): Promise<Game>;
    newMovement(input: AddMovementDTO): Promise<Game>;
    getGameById(gameId: number): Promise<Game>;
    addMovement(input: {
        player: Player;
        game: Game;
        value: number;
        oldValue?: number;
        valueAdded?: number;
    }): Promise<Movement>;
    calculatePossibilities(value: any): any[];
    generateRandomValue(): number;
    notifyGamePlayers(gameId: number, socket: Socket): Promise<void>;
}
