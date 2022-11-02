import { Session } from './session.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { Player } from './play.entity'
import { Movement } from './movement.entity'

export enum GameStatus {
  INPROGRESS = 'inprogress',
  COMPLETED = 'completed',
}

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(() => Player, (player) => player.games, { eager: true })
  player1: Player

  @ManyToOne(() => Player, (player) => player.games, { eager: true })
  player2: Player

  @Column({ type: 'enum', enum: GameStatus, default: GameStatus.INPROGRESS })
  status: string

  @OneToMany(() => Movement, (movement) => movement.game, { eager: true })
  movements?: Movement[]

}
