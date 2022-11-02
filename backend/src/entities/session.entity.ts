import { Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Player } from "./play.entity"

@Entity()
export class Session {
    @PrimaryColumn()
    socketId: string

    @ManyToOne(() => Player, (player) => player.sessions, {eager: true})
    player: Player
}