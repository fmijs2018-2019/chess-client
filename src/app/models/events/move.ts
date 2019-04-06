import { IEventBase } from "./eventBase";
import { ShortMove } from 'chess.js';

export interface IMoveEvent extends IEventBase {
	shortMove: ShortMove,
	fen: string
}