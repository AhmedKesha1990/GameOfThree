import {
  createPlayerOfflineAction,
  createPlayerOnlineAction,
  Events,
} from '@src/const'
import { Inject } from '@src/decorators'
import { PlayerStatus } from '@src/entities/play.entity'
import { PlayerService } from '@src/services/player.service'
import { SessionService } from '@src/services/session.service'
import { Get, JsonController } from 'routing-controllers'
import {
  SocketController,
  OnDisconnect,
  OnMessage,
  MessageBody,
  ConnectedSocket,
  EmitOnSuccess,
  OnConnect,
} from 'socket-controllers'
import { Socket } from 'socket.io'

@JsonController()
@SocketController()
export class PlayerController {
  @Inject('PlayerService') playerService: PlayerService
  @Inject('SessionService') sessionService: SessionService

  @OnMessage(Events.PLAYER_JOIN)
  @EmitOnSuccess(Events.JOIN_SUCCESSFULLY)
  async join(
    @MessageBody() message: { playerId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const { playerId = null } = message
      const { player, newPlayer } = await this.playerService.join(playerId)
      const session = await this.sessionService.createSession({
        player,
        socketId: socket.id,
      })
      player.status = PlayerStatus.ONLINE
      await this.playerService.updatePlayer(player)
      if (newPlayer) {
        socket.broadcast.emit(Events.NEW_PLAYER, player)
      } else {
        socket.broadcast.emit(createPlayerOnlineAction(playerId), player)
      }
      return session
    } catch (err) {
      console.log({ err })
    }
  }

  @OnConnect()
  async connect(@ConnectedSocket() socket: Socket) {
    const session = await this.sessionService.getSession(socket.id)
    if (session) {
      session.player.status = PlayerStatus.ONLINE
      await this.playerService.updatePlayer(session.player)
      socket.broadcast.emit(
        createPlayerOnlineAction(session.player.id),
        session.player,
      )
    }
  }

  @OnDisconnect()
  async leave(@ConnectedSocket() socket: Socket) {
    const session = await this.sessionService.getSession(socket.id)
    session.player.status = PlayerStatus.OFFLINE
    await this.playerService.updatePlayer(session.player)
    socket.broadcast.emit(
      createPlayerOfflineAction(session.player.id),
      session.player,
    )
    this.sessionService.deleteSession(socket.id)
  }

  @Get('/players')
  getAll() {
    return this.playerService.fetchPlayers()
  }
}
