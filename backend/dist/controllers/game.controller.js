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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const routing_controllers_1 = require("routing-controllers");
const socket_controllers_1 = require("socket-controllers");
const decorators_1 = require("@src/decorators");
const services_1 = require("@src/services");
const socket_io_1 = require("socket.io");
const dto_1 = require("@src/dto");
const const_1 = require("@src/const");
let GameController = class GameController {
    async init(input) {
        const game = await this.gameService.init(input);
        return game;
    }
    async addMovement(input) {
        const game = await this.gameService.newMovement(input);
        return game;
    }
    joinGame(socket, body) {
        const { gameId } = body;
        socket.join(String(gameId));
    }
    reset(socket, body) {
        const { gameId } = body;
        socket.to(String(gameId)).emit((0, const_1.createRestAction)(gameId));
        socket.emit((0, const_1.createRestAction)(gameId));
    }
    notifyGamePlayers(socket, body) {
        const { gameId } = body;
        this.gameService.notifyGamePlayers(gameId, socket);
    }
};
__decorate([
    (0, decorators_1.Inject)('GameService'),
    __metadata("design:type", services_1.GameService)
], GameController.prototype, "gameService", void 0);
__decorate([
    (0, routing_controllers_1.Post)('/game'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.InitGameDTO]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "init", null);
__decorate([
    (0, routing_controllers_1.Post)('/game/add-movement'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AddMovementDTO]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "addMovement", null);
__decorate([
    (0, socket_controllers_1.OnMessage)(const_1.Events.JOIN_GAME),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __param(1, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "joinGame", null);
__decorate([
    (0, socket_controllers_1.OnMessage)(const_1.Events.GAME_RESET),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __param(1, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "reset", null);
__decorate([
    (0, socket_controllers_1.OnMessage)(const_1.Events.GAME_CHANGE),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __param(1, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "notifyGamePlayers", null);
GameController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    (0, socket_controllers_1.SocketController)()
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map