export enum Events {
  JOIN_GAME = 'join-game',
  GAME_RESET = 'game-reset',
  GAME_CHANGE = 'game-change',
  NEW_PLAYER = 'new_player',
  PLAYER_JOIN = 'join',
  JOIN_SUCCESSFULLY = 'join_successfully',
}

export const createRestAction = (gameId: number) => `game_${gameId}_reset`
export const createChangeAction = (gameId: number) => `game_${gameId}_change`
export const createPlayerOnlineAction = (playerId: number) =>
  `${playerId}_online`
export const createPlayerOfflineAction = (playerId: number) =>
  `${playerId}_offline`
