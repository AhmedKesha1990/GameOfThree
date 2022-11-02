import { Game } from "./game"

export enum PlayerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}
export interface Player {
  id: number
  name: string
  status: PlayerStatus
  games?: Game[]
}
