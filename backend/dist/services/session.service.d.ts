import { Player } from '@src/entities/play.entity';
import { Session } from '@src/entities/session.entity';
import { Repository } from 'typeorm';
export declare class SessionService {
    sessionRepository: Repository<Session>;
    constructor();
    createSession(session: Session): Promise<Session>;
    getSession(socketId: string): Promise<Session>;
    deleteSession(socketId: string): void;
    getPlayersSessions(players: Player[]): Promise<Session[]>;
}
