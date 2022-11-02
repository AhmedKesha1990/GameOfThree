import { JsonController, Body, Post } from 'routing-controllers'
import {
  ConnectedSocket,
  EmitOnSuccess,
  MessageBody,
  OnMessage,
  SocketController,
} from 'socket-controllers'

import { Inject } from '@src/decorators'
import { GameService } from '@src/services'
import { Socket } from 'socket.io'
import { AddMovementDTO, InitGameDTO } from '@src/dto'
import { createRestAction, Events } from '@src/const'

@JsonController()
@SocketController()
export class GameController {
  @Inject('GameService') gameService: GameService

  @Post('/game')
  async init(@Body() input: InitGameDTO) {
    const game = await this.gameService.init(input)
    return game
  }

  @Post('/game/add-movement')
  async addMovement(@Body() input: AddMovementDTO) {
    const game = await this.gameService.newMovement(input)
    return game
  }

  @OnMessage(Events.JOIN_GAME)
  joinGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: { gameId: number },
  ) {
    const { gameId } = body
    socket.join(String(gameId))
  }

  @OnMessage(Events.GAME_RESET)
  reset(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: { gameId: number },
  ) {
    const { gameId } = body
    socket.to(String(gameId)).emit(createRestAction(gameId))
    socket.emit(createRestAction(gameId))
  }

  @OnMessage(Events.GAME_CHANGE)
  notifyGamePlayers(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: any,
  ) {
    const { gameId } = body
    this.gameService.notifyGamePlayers(gameId, socket)
  }
}
