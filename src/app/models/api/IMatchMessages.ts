import { IMessageEvent } from './IMessageEvent';

export interface IMatchMessages {
	matchId: string,
	messages: IMessageEvent[]
}