"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const index_1 = require("./../const/index");
const app_data_source_1 = require("@src/app-data-source");
const game_entity_1 = require("@src/entities/game.entity");
const movement_entity_1 = require("@src/entities/movement.entity");
const decorators_1 = require("../decorators");
const player_service_1 = require("./player.service");
const session_service_1 = require("./session.service");
let GameService = class GameService {
    constructor() {
        this.gameRepository = app_data_source_1.DB.getRepository(game_entity_1.Game);
        this.movementRepository = app_data_source_1.DB.getRepository(movement_entity_1.Movement);
    }
    async init(input) {
        const { playerOneId, playerTwoId } = input;
        const queryRunner = app_data_source_1.DB.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { player1, player2 } = await this.loadGamePlayers({
                playerOneId,
                playerTwoId,
            });
            let game = await this.loadGame({ player1, player2 });
            if (!game) {
                game = await this.createGame({
                    player1,
                    player2,
                });
                const random = this.generateRandomValue();
                await this.addMovement({ player: player1, game, value: random });
            }
            await queryRunner.commitTransaction();
            return this.getGameById(game.id);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async loadGamePlayers(input) {
        const { playerOneId, playerTwoId } = input;
        const [player1, player2] = await Promise.all([playerOneId, playerTwoId].map(this.playerService.getPlayer.bind(this.playerService)));
        return { player1, player2 };
    }
    async createGame(input) {
        const { player1, player2 } = input;
        return this.gameRepository.save({
            player1,
            player2,
            status: game_entity_1.GameStatus.INPROGRESS,
        });
    }
    async loadGame(input) {
        const { player1, player2 } = input;
        return this.gameRepository.findOne({
            where: [
                { player1, player2, status: game_entity_1.GameStatus.INPROGRESS },
                { player1: player2, player2: player1, status: game_entity_1.GameStatus.INPROGRESS },
            ],
        });
    }
    async newMovement(input) {
        const { gameId, playerId, movementValue, oldValue, valueAdded } = input;
        const game = await this.getGameById(gameId);
        if (game.status === game_entity_1.GameStatus.COMPLETED)
            throw new Error('Bad Request');
        const lastMovement = game.movements.find((movement) => movement.isLast);
        if (lastMovement.player.id === playerId)
            throw new Error('Bad Request');
        const player = await this.playerService.getPlayer(playerId);
        await this.movementRepository.update({ game }, { isLast: false });
        if (movementValue === 1) {
            await this.gameRepository.update({ id: game.id }, { status: game_entity_1.GameStatus.COMPLETED });
        }
        await this.addMovement({
            player,
            game,
            value: movementValue,
            valueAdded,
            oldValue,
        });
        return this.getGameById(game.id);
    }
    getGameById(gameId) {
        return this.gameRepository.findOne({ where: { id: gameId } });
    }
    addMovement(input) {
        const { player, game, value, valueAdded = 0, oldValue = value } = input;
        const possibilities = this.calculatePossibilities(value).join(',');
        return this.movementRepository.save({
            game,
            player,
            isLast: true,
            possibilities,
            value,
            valueAdded,
            oldValue,
        });
    }
    calculatePossibilities(value) {
        const possibilities = [];
        const possibilitiesValues = [1, -1, 0];
        possibilitiesValues.forEach((possibility) => {
            const combinedValue = Number(value) + possibility;
            if (combinedValue % 3 === 0 && combinedValue >= 3) {
                possibilities.push(possibility);
            }
        });
        return possibilities;
    }
    generateRandomValue() {
        let random = parseInt(String(Math.random() * 1000));
        while (random <= 3) {
            random = parseInt(String(Math.random() * 1000));
        }
        return random;
    }
    async notifyGamePlayers(gameId, socket) {
        const game = await this.getGameById(gameId);
        socket.to(String(gameId)).emit((0, index_1.createChangeAction)(game.id), game);
    }
};
__decorate([
    (0, decorators_1.Inject)('PlayerService'),
    __metadata("design:type", player_service_1.PlayerService)
], GameService.prototype, "playerService", void 0);
__decorate([
    (0, decorators_1.Inject)('SessionService'),
    __metadata("design:type", session_service_1.SessionService)
], GameService.prototype, "sessionService", void 0);
GameService = __decorate([
    (0, decorators_1.Injectable)('GameService'),
    __metadata("design:paramtypes", [])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map