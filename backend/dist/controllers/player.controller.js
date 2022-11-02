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
exports.PlayerController = void 0;
const const_1 = require("@src/const");
const decorators_1 = require("@src/decorators");
const play_entity_1 = require("@src/entities/play.entity");
const player_service_1 = require("@src/services/player.service");
const session_service_1 = require("@src/services/session.service");
const routing_controllers_1 = require("routing-controllers");
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
let PlayerController = class PlayerController {
    async join(message, socket) {
        try {
            const { playerId = null } = message;
            const { player, newPlayer } = await this.playerService.join(playerId);
            const session = await this.sessionService.createSession({
                player,
                socketId: socket.id,
            });
            player.status = play_entity_1.PlayerStatus.ONLINE;
            await this.playerService.updatePlayer(player);
            if (newPlayer) {
                socket.broadcast.emit(const_1.Events.NEW_PLAYER, player);
            }
            else {
                socket.broadcast.emit((0, const_1.createPlayerOnlineAction)(playerId), player);
            }
            return session;
        }
        catch (err) {
            console.log({ err });
        }
    }
    async connect(socket) {
        const session = await this.sessionService.getSession(socket.id);
        if (session) {
            session.player.status = play_entity_1.PlayerStatus.ONLINE;
            await this.playerService.updatePlayer(session.player);
            socket.broadcast.emit((0, const_1.createPlayerOnlineAction)(session.player.id), session.player);
        }
    }
    async leave(socket) {
        const session = await this.sessionService.getSession(socket.id);
        session.player.status = play_entity_1.PlayerStatus.OFFLINE;
        await this.playerService.updatePlayer(session.player);
        socket.broadcast.emit((0, const_1.createPlayerOfflineAction)(session.player.id), session.player);
        this.sessionService.deleteSession(socket.id);
    }
    getAll() {
        return this.playerService.fetchPlayers();
    }
};
__decorate([
    (0, decorators_1.Inject)('PlayerService'),
    __metadata("design:type", player_service_1.PlayerService)
], PlayerController.prototype, "playerService", void 0);
__decorate([
    (0, decorators_1.Inject)('SessionService'),
    __metadata("design:type", session_service_1.SessionService)
], PlayerController.prototype, "sessionService", void 0);
__decorate([
    (0, socket_controllers_1.OnMessage)(const_1.Events.PLAYER_JOIN),
    (0, socket_controllers_1.EmitOnSuccess)(const_1.Events.JOIN_SUCCESSFULLY),
    __param(0, (0, socket_controllers_1.MessageBody)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "join", null);
__decorate([
    (0, socket_controllers_1.OnConnect)(),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "connect", null);
__decorate([
    (0, socket_controllers_1.OnDisconnect)(),
    __param(0, (0, socket_controllers_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "leave", null);
__decorate([
    (0, routing_controllers_1.Get)('/players'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "getAll", null);
PlayerController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    (0, socket_controllers_1.SocketController)()
], PlayerController);
exports.PlayerController = PlayerController;
//# sourceMappingURL=player.controller.js.map