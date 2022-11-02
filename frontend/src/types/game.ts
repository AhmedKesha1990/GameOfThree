import { Movement } from "./movement"
import { Player } from "./player"

export enum GameStatus {
  INPROGRESS = 'inprogress',
  COMPLETED = 'completed',
}

export interface Game {
  id: number
  player1: Player
  player2: Player
  status: GameStatus
  movements?: Movement[]

}

