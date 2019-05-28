import { IEvent } from './IEvent';
import { Square } from 'chess.js';

export interface IMove extends IEvent {
	playerId: string, // sub claim from IProfilePayload
	from: Square,
	to: Square,
	color: 'w' | 'b',
	promotion?: 'n' | 'b' | 'r' | 'q',
	flag: string,
	san: string,
	captured?: 'p' | 'n' | 'b' | 'r' | 'q';
	piece: 'p' | 'n' | 'b' | 'r' | 'q' | 'k',
	newFENPos: string,
	oldFENPos: string,
	time: number,
}