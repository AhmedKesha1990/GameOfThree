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
exports.Game = exports.GameStatus = void 0;
const typeorm_1 = require("typeorm");
const play_entity_1 = require("./play.entity");
const movement_entity_1 = require("./movement.entity");
var GameStatus;
(function (GameStatus) {
    GameStatus["INPROGRESS"] = "inprogress";
    GameStatus["COMPLETED"] = "completed";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));
let Game = class Game {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => play_entity_1.Player, (player) => player.games, { eager: true }),
    __metadata("design:type", play_entity_1.Player)
], Game.prototype, "player1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => play_entity_1.Player, (player) => player.games, { eager: true }),
    __metadata("design:type", play_entity_1.Player)
], Game.prototype, "player2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: GameStatus, default: GameStatus.INPROGRESS }),
    __metadata("design:type", String)
], Game.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movement_entity_1.Movement, (movement) => movement.game, { eager: true }),
    __metadata("design:type", Array)
], Game.prototype, "movements", void 0);
Game = __decorate([
    (0, typeorm_1.Entity)()
], Game);
exports.Game = Game;
//# sourceMappingURL=game.entity.js.map