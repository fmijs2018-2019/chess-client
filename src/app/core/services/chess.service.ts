import { Injectable } from '@angular/core';
import { ChessBoardFactory, BoardConfig } from 'chessboardjs';
import { ChessInstance, ShortMove, Square } from 'chess.js';

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
	orientation: string,
	onDrop?: any,
	fen?: string,
	inCheck?: any,
	inCheckmate?: any,
	inDraw?: any,
	inStalemate?: any,
	inThreefoldRepetition?: any,
	insufficientMaterial?: any,
	gameOver?: any
}

export interface IGameStatus {
	inCheck: boolean,
	inCheckmate: boolean,
	inDraw: boolean,
	inStalemate: boolean,
	inThreefoldRepetition: boolean,
	insufficientMaterial: boolean,
	gameOver: boolean
}

@Injectable({
	providedIn: 'root'
})
export class ChessService {
	private game: ChessInstance;
	private board: any;
	private orientation: string;
	private options: IBoardInitOptions;

	init = (options: IBoardInitOptions) => {
		this.options = options;
		this.orientation = options.orientation;
		this.game = new Chess(options.fen);
		const cfg: BoardConfig = {
			draggable: true,
			position: options.fen || 'start',
			orientation: options.orientation as any,
			onDragStart: this.onDragStart as any,
			onDrop: this.onDrop as any,
			onSnapEnd: this.onSnapEnd
		};
		this.board = ChessBoard(options.elementId, cfg);
		return this.board;
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
			const gameStatus = this.getBoardStatus();
			this.notifyBoardStatus(gameStatus);
			return true;
		}

		return false;
	}

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	onDragStart = (source, piece, position, orientation) => {
		const turn = this.game.turn();
		return !this.game.game_over() && turn === orientation[0] && turn === piece[0];
	};

	getBoardStatus = (): IGameStatus => {
		return {
			inCheck: this.game.in_check(),
			inCheckmate: this.game.in_checkmate(),
			inDraw: this.game.in_draw(),
			inStalemate: this.game.in_stalemate(),
			inThreefoldRepetition: this.game.in_threefold_repetition(),
			insufficientMaterial: this.game.insufficient_material(),
			gameOver: this.game.game_over()
		}
	}

	notifyBoardStatus = (status: IGameStatus) => {
		const { inCheck, inCheckmate, inDraw, inStalemate, inThreefoldRepetition,
			insufficientMaterial, gameOver } = this.options;

		status.inCheck && inCheck && inCheck();
		status.inCheckmate && inCheckmate && inCheckmate();
		status.inDraw && inDraw && inDraw();
		status.inStalemate && inStalemate && inStalemate();
		status.inThreefoldRepetition && inThreefoldRepetition && inThreefoldRepetition();
		status.insufficientMaterial && insufficientMaterial && insufficientMaterial();
		status.gameOver && gameOver && gameOver();
	}

	onDrop = (source, target) => {
		const shortMove: ShortMove = {
			from: source,
			to: target,
			promotion: 'q'
		}

		const oldFENPos = this.game.fen();

		// see if the move is legal
		const move = this.game.move(shortMove);

		// illegal move
		if (!move) { return 'snapback'; }

		const gameStatus = this.getBoardStatus();

		this.notifyBoardStatus(gameStatus);

		const moveEventPayload = {
			...move,
			oldFENPos,
			newFENPos: this.game.fen(),
			time: 0,
			type: EventType.MoveEvent,
			...gameStatus
		}

		if (this.options.onDrop) {
			this.options.onDrop(moveEventPayload);
		}
	};

	// update the board position after the piece snap
	// for castling, en passant, pawn promotion
	onSnapEnd = () => {
		this.board.position(this.game.fen());
	};
}

export enum EventType {
	MessageEvent = 0,
	MoveEvent = 1,
}