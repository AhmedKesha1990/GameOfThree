import { DB } from '@src/app-data-source'
import { Player } from '@src/entities/play.entity'
import { Repository } from 'typeorm'
import { Injectable } from '../decorators'

@Injectable('PlayerService')
export class PlayerService {
  playerRepository: Repository<Player>

  constructor() {
    this.playerRepository = DB.getRepository(Player)
  }

  getPlayer(playerId: number): Promise<Player> {
    return this.playerRepository.findOne({ where: { id: Number(playerId) } })
  }

  createPlayer(): Promise<Player> {
    return this.playerRepository.save({ name: `Player_${+new Date()}` })
  }

  updatePlayer(player: Player): Promise<Player> {
    return this.playerRepository.save(player)
  }

  async join(
    playerId: number,
  ): Promise<{ player: Player; newPlayer: boolean }> {
    let newPlayer = false
    let player = await this.getPlayer(playerId)
    if (!player) {
      newPlayer = true
      player = await this.createPlayer()
    }
    return { player, newPlayer }
  }

  fetchPlayers(): Promise<Player[]> {
    return this.playerRepository.find()
  }
}
