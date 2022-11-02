import { Game } from './game'
import { Player } from './player'

export interface Movement {
  id: number
  player: Player
  value: number
  oldValue: number
  valueAdded: number
  possibilities: string
  isLast: boolean
  game: Game
}
