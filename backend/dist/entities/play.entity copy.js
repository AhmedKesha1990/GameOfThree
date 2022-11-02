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
exports.Player = exports.PlayerStatus = void 0;
const session_entity_1 = require("./session.entity");
const typeorm_1 = require("typeorm");
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus["ONLINE"] = "online";
    PlayerStatus["OFFLINE"] = "offline";
})(PlayerStatus = exports.PlayerStatus || (exports.PlayerStatus = {}));
let Player = class Player {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PlayerStatus, default: PlayerStatus.OFFLINE }),
    __metadata("design:type", String)
], Player.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (session) => session.player),
    __metadata("design:type", Array)
], Player.prototype, "sessions", void 0);
Player = __decorate([
    (0, typeorm_1.Entity)()
], Player);
exports.Player = Player;
//# sourceMappingURL=play.entity%20copy.js.map