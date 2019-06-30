import { Injectable } from '@angular/core';
import { Move } from 'chess.js';
import { EventType } from './chess.service';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { IBoardStatus } from "src/app/models/api/IBoardStatus";

@Injectable({
	providedIn: 'root'
})
export class ChessFactoryService {

	constructor() { }

	createMoveEvent = (move: Move, status: IBoardStatus, oldFENPos: string, newFENPos: string, time: number): IMoveEvent => {
		return {
			...move,
			...status,
			time,
			oldFENPos,
			newFENPos,
			type: EventType.MoveEvent,
		};
	}
}
