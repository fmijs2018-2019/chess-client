import { Injectable } from '@angular/core';
import { ChessBoardFactory } from 'chessboardjs';
import { ChessInstance, ShortMove, Square } from 'chess.js';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Options } from 'selenium-webdriver/ie';

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

export interface IBoardInitOptions {
	elementId: string,
	room: string,
	orientation: string,
	onDrop?: any,
	fen?: string
}

@Injectable({
	providedIn: 'root'
})
export class ChessService {
	game: ChessInstance;
	board: any;
	room: string;
	orientation: string;
	options: IBoardInitOptions;

	constructor() {
	}

	init = (options: IBoardInitOptions) => {
		this.options = options;
		this.orientation = options.orientation;
		this.game = Chess(options.fen || 'start');
		const cfg = {
			draggable: true,
			position: options.fen || 'start',
			orientation,
			onDragStart: this.onDragStart,
			onDrop: this.onDrop,
			onSnapEnd: this.onSnapEnd
		};
		this.board = ChessBoard(options.elementId, cfg);


	}

	move = (source: string, target: string) => {
		const moveStr = `${source}-${target}`;
		const shortMove: ShortMove = {
			from: source as Square,
			to: target as Square,
			promotion: 'q'
		}

		const move = this.game.move(shortMove);

		if (move) {
			this.board.position(this.board.move(moveStr));
			return true;
		}

		return false;
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
		const turn = this.game.turn();
		return !this.game.game_over() && turn === orientation[0] && turn === piece[0];
	};

	onDrop = (source, target) => {
		const shortMove: ShortMove = {
			from: source,
			to: target,
			promotion: 'q'
		}
		// see if the move is legal
		const move = this.game.move(shortMove);

		// illegal move
		if (!move) { return 'snapback'; }

		if (this.options.onDrop) {
			this.options.onDrop(shortMove);
		}

	};

	// update the board position after the piece snap
	// for castling, en passant, pawn promotion
	onSnapEnd = () => {
		this.board.position(this.game.fen());
	};
}
