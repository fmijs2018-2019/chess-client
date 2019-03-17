import { IEvent } from './IEvent';
import { Move } from 'chess.js';

export interface IMoveEvent extends IEvent {
	move: Move;
}

export class MoveEvent implements IMoveEvent {
	move: Move;
	id: string;	
	type: 'move' | 'message' = 'move';
	serverTime: number;
	room: string;

	constructor(id: string, room: string, move: Move) {
		this.id = id;
		this.room = room;
		this.move = move;
		this.serverTime = Date.now();
	}
}
