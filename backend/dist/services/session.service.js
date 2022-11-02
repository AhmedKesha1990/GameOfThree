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
exports.SessionService = void 0;
const app_data_source_1 = require("@src/app-data-source");
const session_entity_1 = require("@src/entities/session.entity");
const typeorm_1 = require("typeorm");
const decorators_1 = require("../decorators");
let SessionService = class SessionService {
    constructor() {
        this.sessionRepository = app_data_source_1.DB.getRepository(session_entity_1.Session);
    }
    createSession(session) {
        return this.sessionRepository.save(session);
    }
    getSession(socketId) {
        return this.sessionRepository.findOne({ where: { socketId } });
    }
    deleteSession(socketId) {
        this.sessionRepository.delete(socketId);
    }
    getPlayersSessions(players) {
        return this.sessionRepository.find({ where: { player: (0, typeorm_1.In)(players) } });
    }
};
SessionService = __decorate([
    (0, decorators_1.Injectable)('SessionService'),
    __metadata("design:paramtypes", [])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map