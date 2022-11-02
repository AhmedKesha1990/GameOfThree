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
exports.Movement = void 0;
const typeorm_1 = require("typeorm");
const game_entity_1 = require("./game.entity");
const play_entity_1 = require("./play.entity");
let Movement = class Movement {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Movement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => play_entity_1.Player, (player) => player.movements, { eager: true }),
    __metadata("design:type", play_entity_1.Player)
], Movement.prototype, "player", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number }),
    __metadata("design:type", Number)
], Movement.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number }),
    __metadata("design:type", Number)
], Movement.prototype, "valueAdded", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Movement.prototype, "possibilities", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean }),
    __metadata("design:type", Boolean)
], Movement.prototype, "isLast", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number }),
    __metadata("design:type", Number)
], Movement.prototype, "oldValue", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => game_entity_1.Game, (game) => game.movements),
    __metadata("design:type", game_entity_1.Game)
], Movement.prototype, "game", void 0);
Movement = __decorate([
    (0, typeorm_1.Entity)()
], Movement);
exports.Movement = Movement;
//# sourceMappingURL=movement.entity.js.map