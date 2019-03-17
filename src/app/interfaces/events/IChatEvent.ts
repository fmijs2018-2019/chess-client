import { IEvent } from './IEvent';

export interface IChatEvent extends IEvent {
	sender: string;
	message: string;
}

export class ChatEvent implements IChatEvent {
	id: string;
	type: 'move' | 'message' = 'message';
	serverTime: number;
	room: string;
	sender: string;
	message: string;

	constructor(id: string, room: string, sender: string, message: string) {
		this.id = id;
		this.room = room;
		this.sender = sender;
		this.message = message;
		this.serverTime = Date.now();
	}
}