export declare enum Events {
    JOIN_GAME = "join-game",
    GAME_RESET = "game-reset",
    GAME_CHANGE = "game-change",
    NEW_PLAYER = "new_player",
    PLAYER_JOIN = "join",
    JOIN_SUCCESSFULLY = "join_successfully"
}
export declare const createRestAction: (gameId: number) => string;
export declare const createChangeAction: (gameId: number) => string;
export declare const createPlayerOnlineAction: (playerId: number) => string;
export declare const createPlayerOfflineAction: (playerId: number) => string;
