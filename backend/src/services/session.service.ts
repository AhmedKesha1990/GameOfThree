import { DB } from '@src/app-data-source'
import { Player } from '@src/entities/play.entity'
import { Session } from '@src/entities/session.entity'
import { In, Repository } from 'typeorm'
import { Injectable } from '../decorators'

@Injectable('SessionService')
export class SessionService {
  sessionRepository: Repository<Session>

  constructor() {
    this.sessionRepository = DB.getRepository(Session)
  }

  createSession(session: Session): Promise<Session> {
    return this.sessionRepository.save(session)
  }

  getSession(socketId: string): Promise<Session> {
    return this.sessionRepository.findOne({ where: { socketId } })
  }

  deleteSession(socketId: string): void {
    this.sessionRepository.delete(socketId)
  }

  getPlayersSessions(players: Player[]) {
    return this.sessionRepository.find({ where: { player: In(players) } })
  }
}
