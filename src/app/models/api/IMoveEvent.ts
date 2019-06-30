import { IEvent } from './IEvent';
import { Move } from 'chess.js';
import { IBoardStatus } from './IBoardStatus';

export interface IMoveEvent extends IEvent, Move, IBoardStatus {
	newFENPos: string,
	oldFENPos: string,
	time?: number,
}

