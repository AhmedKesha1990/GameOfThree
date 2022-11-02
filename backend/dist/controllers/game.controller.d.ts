import { GameService } from '@src/services';
import { Socket } from 'socket.io';
import { AddMovementDTO, InitGameDTO } from '@src/dto';
export declare class GameController {
    gameService: GameService;
    init(input: InitGameDTO): Promise<import("../entities/game.entity").Game>;
    addMovement(input: AddMovementDTO): Promise<import("../entities/game.entity").Game>;
    joinGame(socket: Socket, body: {
        gameId: number;
    }): void;
    reset(socket: Socket, body: {
        gameId: number;
    }): void;
    notifyGamePlayers(socket: Socket, body: any): void;
}
