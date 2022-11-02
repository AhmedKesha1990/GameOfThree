import { Player } from '../types/player'
import { BackendService } from './backend.service'
export class PlayerService extends BackendService {
  private static readonly ENDPOINT = 'players'

  async fetchPlayer() {
    const { data } = await this.client.get<Player[]>(PlayerService.ENDPOINT)
    return data
  }
}

const playerService = new PlayerService()
Object.freeze(playerService)
export default playerService
