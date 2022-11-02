"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayerOfflineAction = exports.createPlayerOnlineAction = exports.createChangeAction = exports.createRestAction = exports.Events = void 0;
var Events;
(function (Events) {
    Events["JOIN_GAME"] = "join-game";
    Events["GAME_RESET"] = "game-reset";
    Events["GAME_CHANGE"] = "game-change";
    Events["NEW_PLAYER"] = "new_player";
    Events["PLAYER_JOIN"] = "join";
    Events["JOIN_SUCCESSFULLY"] = "join_successfully";
})(Events = exports.Events || (exports.Events = {}));
const createRestAction = (gameId) => `game_${gameId}_reset`;
exports.createRestAction = createRestAction;
const createChangeAction = (gameId) => `game_${gameId}_change`;
exports.createChangeAction = createChangeAction;
const createPlayerOnlineAction = (playerId) => `${playerId}_online`;
exports.createPlayerOnlineAction = createPlayerOnlineAction;
const createPlayerOfflineAction = (playerId) => `${playerId}_offline`;
exports.createPlayerOfflineAction = createPlayerOfflineAction;
//# sourceMappingURL=index.js.map