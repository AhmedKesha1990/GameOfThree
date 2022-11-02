import { Movement } from '../types/movement'
import { Player } from '../types/player'
import { Game } from '../types/game'

import { BackendService } from './backend.service'

export interface FetchGameParams {
  playerOneId: number
  playerTwoId: number
}

export interface AddMovmentParams {
  player: Player
  movement: Movement
  valueAdded: number
  game: Game
}

export class GameService extends BackendService {
  private static readonly ENDPOINT = 'game'

  async fetchGame(params: FetchGameParams) {
    const { playerOneId, playerTwoId } = params
    const { data } = await this.client.post<Game>(GameService.ENDPOINT, {
      playerOneId,
      playerTwoId,
    })
    return data
  }

  async addMovment(params: AddMovmentParams) {
    const { player, game, valueAdded, movement } = params
    if (!movement.isLast) throw new Error('Not allowed to use this movment.')

    const { value } = movement
    const newValue = +value + +valueAdded
    if (newValue % 3 !== 0) throw new Error('Bad value.')

    const movementValue = newValue / 3

    const { data } = await this.client.post<Game>(
      `${GameService.ENDPOINT}/add-movement`,
      {
        playerId: player.id,
        gameId: game.id,
        movementValue,
        valueAdded,
        oldValue: value,
      },
    )
    return data
  }
}

const gameService = new GameService()
Object.freeze(gameService)
export default gameService
