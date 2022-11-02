"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const typeorm_1 = require("typeorm");
const game_entity_1 = require("./entities/game.entity");
const movement_entity_1 = require("./entities/movement.entity");
const play_entity_1 = require("./entities/play.entity");
const session_entity_1 = require("./entities/session.entity");
exports.DB = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [play_entity_1.Player, session_entity_1.Session, game_entity_1.Game, movement_entity_1.Movement],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=app-data-source.js.map