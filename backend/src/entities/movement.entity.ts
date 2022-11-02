import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Game } from './game.entity'
import { Player } from './play.entity'

@Entity()
export class Movement {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(() => Player,(player) => player.movements, {eager: true})
  player: Player

  @Column({ type: Number })
  value: number

  @Column({ type: Number })
  valueAdded: number

  @Column()
  possibilities: string

  @Column({type: Boolean})
  isLast: boolean

  @Column({type: Number})
  oldValue: number

  @ManyToOne(() => Game, (game) => game.movements)
  game: Game
}
