import { createChangeAction } from './../const/index'
import { Player } from '@src/entities/play.entity'
import { DB } from '@src/app-data-source'
import { AddMovementDTO, InitGameDTO } from '@src/dto'
import { Game, GameStatus } from '@src/entities/game.entity'
import { Movement } from '@src/entities/movement.entity'
import { Socket } from 'socket.io'
import { Repository } from 'typeorm'
import { Inject, Injectable } from '../decorators'
import { PlayerService } from './player.service'
import { SessionService } from './session.service'

@Injectable('GameService')
export class GameService {
  @Inject('PlayerService') playerService: PlayerService
  @Inject('SessionService') sessionService: SessionService

  gameRepository: Repository<Game>
  movementRepository: Repository<Movement>

  constructor() {
    this.gameRepository = DB.getRepository(Game)
    this.movementRepository = DB.getRepository(Movement)
  }

  async init(input: InitGameDTO) {
    const { playerOneId, playerTwoId } = input
    const queryRunner = DB.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const { player1, player2 } = await this.loadGamePlayers({
        playerOneId,
        playerTwoId,
      })
      let game = await this.loadGame({ player1, player2 })
      if (!game) {
        game = await this.createGame({
          player1,
          player2,
        })
        const random = this.generateRandomValue()
        await this.addMovement({ player: player1, game, value: random })
      }
      await queryRunner.commitTransaction()
      return this.getGameById(game.id)
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  async loadGamePlayers(input: {
    playerOneId: number
    playerTwoId: number
  }): Promise<{ player1: Player; player2: Player }> {
    const { playerOneId, playerTwoId } = input
    const [player1, player2] = await Promise.all<Player[]>(
      [playerOneId, playerTwoId].map(
        this.playerService.getPlayer.bind(this.playerService),
      ),
    )
    return { player1, player2 }
  }

  async createGame(input: { player1: Player; player2: Player }): Promise<Game> {
    const { player1, player2 } = input
    return this.gameRepository.save<Game>({
      player1,
      player2,
      status: GameStatus.INPROGRESS,
    })
  }

  async loadGame(input: { player1: Player; player2: Player }): Promise<Game> {
    const { player1, player2 } = input
    return this.gameRepository.findOne({
      where: [
        { player1, player2, status: GameStatus.INPROGRESS },
        { player1: player2, player2: player1, status: GameStatus.INPROGRESS },
      ],
    })
  }

  async newMovement(input: AddMovementDTO): Promise<Game> {
    const { gameId, playerId, movementValue, oldValue, valueAdded } = input
    const game = await this.getGameById(gameId)
    if (game.status === GameStatus.COMPLETED) throw new Error('Bad Request')

    const lastMovement: Movement = game.movements.find(
      (movement) => movement.isLast,
    )
    if (lastMovement.player.id === playerId) throw new Error('Bad Request')
    const player = await this.playerService.getPlayer(playerId)
    await this.movementRepository.update({ game }, { isLast: false })
    if (movementValue === 1) {
      await this.gameRepository.update(
        { id: game.id },
        { status: GameStatus.COMPLETED },
      )
    }
    await this.addMovement({
      player,
      game,
      value: movementValue,
      valueAdded,
      oldValue,
    })
    return this.getGameById(game.id)
  }

  getGameById(gameId: number): Promise<Game> {
    return this.gameRepository.findOne({ where: { id: gameId } })
  }

  addMovement(input: {
    player: Player
    game: Game
    value: number
    oldValue?: number
    valueAdded?: number
  }): Promise<Movement> {
    const { player, game, value, valueAdded = 0, oldValue = value } = input
    const possibilities = this.calculatePossibilities(value).join(',')
    return this.movementRepository.save({
      game,
      player,
      isLast: true,
      possibilities,
      value,
      valueAdded,
      oldValue,
    })
  }

  calculatePossibilities(value) {
    const possibilities = []
    const possibilitiesValues = [1, -1, 0]
    possibilitiesValues.forEach((possibility) => {
      const combinedValue = Number(value) + possibility
      if (combinedValue % 3 === 0 && combinedValue >= 3) {
        possibilities.push(possibility)
      }
    })
    return possibilities
  }

  generateRandomValue(): number {
    let random = parseInt(String(Math.random() * 1000))
    while (random <= 3) {
      random = parseInt(String(Math.random() * 1000))
    }
    return random
  }

  async notifyGamePlayers(gameId: number, socket: Socket) {
    const game = await this.getGameById(gameId)
    socket.to(String(gameId)).emit(createChangeAction(game.id), game)
  }
}
