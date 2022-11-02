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
exports.PlayerService = void 0;
const app_data_source_1 = require("@src/app-data-source");
const play_entity_1 = require("@src/entities/play.entity");
const decorators_1 = require("../decorators");
let PlayerService = class PlayerService {
    constructor() {
        this.playerRepository = app_data_source_1.DB.getRepository(play_entity_1.Player);
    }
    getPlayer(playerId) {
        return this.playerRepository.findOne({ where: { id: playerId } });
    }
    createPlayer() {
        return this.playerRepository.save({ name: `Player_${+new Date()}` });
    }
    async join(playerId) {
        const player = await this.getPlayer(playerId);
        if (!player) {
            return this.createPlayer();
        }
        return player;
    }
    fetchPlayers() {
        return [{ id: 900 }];
    }
};
PlayerService = __decorate([
    (0, decorators_1.Injectable)('PlayerService'),
    __metadata("design:paramtypes", [])
], PlayerService);
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service%20copy.js.map