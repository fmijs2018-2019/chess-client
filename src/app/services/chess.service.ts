import { Injectable, Input } from '@angular/core';
import { ChessBoardFactory, BoardConfig } from 'chessboardjs';
import { ChessInstance } from 'chess.js';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { IEvent, EventType } from '../models/event/event';

declare const Chess: {
    /**
     * The Chess() constructor takes an optional parameter which specifies
     * the board configuration in Forsyth-Edwards Notation.
     * @param fen specifies the board configuration in Forsyth-Edwards Notation.
     */
	(fen?: string): ChessInstance;

    /**
     * The Chess() constructor takes an optional parameter which specifies
     * the board configuration in Forsyth-Edwards Notation.
     * @param fen specifies the board configuration in Forsyth-Edwards Notation.
     */
	new(fen?: string): ChessInstance;
};
declare const ChessBoard: ChessBoardFactory;
declare const $: any;

@Injectable({
	providedIn: 'root'
})
export class ChessService {
	events: Subject<IEvent>;
	game: ChessInstance;
	board: any;
	room: string;


	constructor(private wsSevice: WebsocketService) {
		this.events = wsSevice.connect();
	}

	init = (elementId: string, room: string) => {
		this.room = room;
		this.game = Chess();
		const cfg = {
			draggable: true,
			position: 'start',
			onDragStart: this.onDragStart,
			onDrop: this.onDrop,
			onSnapEnd: this.onSnapEnd
		};
		this.board = ChessBoard(elementId, cfg);

		this.updateStatus();
	}

	updateStatus = () => {
		let status = '';

		let moveColor = 'White';
		if (this.game.turn() === 'b') {
			moveColor = 'Black';
		}

		// checkmate?
		if (this.game.in_checkmate()) {
			status = 'Game over, ' + moveColor + ' is in checkmate.';
		} else if (this.game.in_draw()) { // draw?
			status = 'Game over, drawn position';
		} else { // game still on
			status = moveColor + ' to move';

			// check?
			if (this.game.in_check()) {
				status += ', ' + moveColor + ' is in check';
			}
		}
	};
	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	onDragStart = (source, piece, position, orientation) => {
		if (!this.game.game_over() ||
			(this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
			(this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
			return false;
		}
	};

	onDrop = (source, target) => {
		// see if the move is legal
		const move = this.game.move({
			from: source,
			to: target,
			promotion: 'q' // NOTE: always promote to a queen for example simplicity
		});

		// illegal move
		if (!move) { return 'snapback'; }

		const moveEvent: IEvent = {
			room: this.room,
			type: EventType.Move,
			payload: move
		};
		this.events.next(moveEvent);
		this.updateStatus();
	};

	// update the board position after the piece snap
	// for castling, en passant, pawn promotion
	onSnapEnd = () => {
		this.board.position(this.game.fen());
	};
}
