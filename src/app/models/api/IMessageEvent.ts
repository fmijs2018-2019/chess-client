import { IEvent } from './IEvent';

export interface IMessageEvent extends IEvent {
	sender: string,
	message: string
}