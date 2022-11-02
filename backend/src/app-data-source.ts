import { DataSource } from "typeorm"
import { Game } from "./entities/game.entity"
import { Movement } from "./entities/movement.entity"
import { Player } from "./entities/play.entity"
import { Session } from "./entities/session.entity"

export const DB = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities: [Player, Session, Game, Movement],
    logging: true,
    synchronize: true,
})