import { Game } from './game.entity'
import { Session } from './session.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Movement } from './movement.entity'

export enum PlayerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string

  @Column({ type: 'enum', enum: PlayerStatus, default: PlayerStatus.OFFLINE })
  status: string

  @OneToMany(() => Session, (session) => session.player)
  sessions?: Session[]

  @OneToMany(() => Game, (game) => game.player1 || game.player2)
  games?: Game[]

  @OneToMany(() => Movement, (movement) => movement.player)
  movements?: Movement[]
}
