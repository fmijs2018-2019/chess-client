import { Injectable } from '@angular/core';
import { BoardConfig, ChessBoardInstance, OrientationType, ChessBoardFactory } from 'chessboardjs';
import { ChessInstance, ShortMove, Square } from 'chess.js';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { IBoardStatus } from "src/app/models/api/IBoardStatus";
import { ChessFactoryService } from './chess-factory.service';
import { TimerService, ITimerOptions as ITimerInitOptions } from './timer.service';

export declare const Chess: {
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
export declare const ChessBoard: ChessBoardFactory;

export const getOpositeTeam = (color: 'w' | 'b') => color === 'w' ? 'b' : 'w';

export interface IBoardInitOptions {
	isTimeGame?: boolean;
	elementId: string,
	orientation: OrientationType,
	fen?: string,
	gameTime?: number,
	moves?: IMoveEvent[],
	onDrop: (move: IMoveEvent) => void,
	inCheck?: (status: IBoardStatus) => void,
	inCheckmate?: (status: IBoardStatus) => void,
	inDraw?: (status: IBoardStatus) => void,
	inStalemate?: (status: IBoardStatus) => void,
	inThreefoldRepetition?: (status: IBoardStatus) => void,
	inInsufficientMaterial?: (status: IBoardStatus) => void,
	inGameOver?: (status: IBoardStatus) => void
	onTimerExpired?: (color: 'w' | 'b') => void
}

@Injectable({
	providedIn: 'root'
})
export class ChessService {
	private isTimeGame: boolean;
	private game: ChessInstance;
	private board: ChessBoardInstance;
	private options: IBoardInitOptions;
	private moves: IMoveEvent[];
	private defaultGameTime = 5 * 60;

	constructor(private chessFactory: ChessFactoryService,
		private timerService: TimerService) {

	}

	init = (options: IBoardInitOptions) => {
		this.options = options;
		this.moves = options.moves || [];
		this.game = new Chess(options.fen);
		this.isTimeGame = options.isTimeGame || false;
		const cfg: BoardConfig = {
			draggable: true,
			position: options.fen || 'start',
			orientation: options.orientation,
			onDragStart: this.onDragStart as any,
			onDrop: this.onDrop as any,
			onSnapEnd: this.onSnapEnd as any,
		};
		this.board = ChessBoard(options.elementId, cfg);

		if (this.isTimeGame) {
			const timerOptions: ITimerInitOptions = {
				gameTime: options.gameTime || this.defaultGameTime,
				onTimeExpire: this.onTimerExpired
			}
			this.timerService.init(timerOptions);
		}

		return this.board;
	}

	move = (moveEvent: IMoveEvent) => {
		const moveStr = `${moveEvent.from}-${moveEvent.to}`;
		const shortMove: ShortMove = {
			from: moveEvent.from,
			to: moveEvent.to,
			promotion: 'q'
		}

		const validMove = this.game.move(shortMove);
		if (!validMove) {
			return false;
		}

		if (this.isTimeGame) {
			this.timerService.pauseTimer(moveEvent.color);
			this.timerService.setTimer(moveEvent.color, moveEvent.time || 0);
			this.timerService.startTimer(getOpositeTeam(moveEvent.color));
		}

		this.moves.push(moveEvent);
		this.board.position(this.board.move(moveStr));
		const gameStatus = this.getBoardStatus();
		this.onBoardStatusChange(gameStatus);
		return true;
	}

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	onDragStart = (source: string, piece: string, position: string, orientation: string) => {
		const turn = this.game.turn();
		return !this.game.game_over() && turn === orientation[0] && turn === piece[0];
	};

	getBoardStatus = (): IBoardStatus => {
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

	getMoves = (): IMoveEvent[] => {
		return this.moves;
	}

	getWhiteTimer = () => {
		return this.isTimeGame
			? this.timerService.getWhiteTimer()
			: { seconds: -1 };
	}

	getBlackTimer = () => {
		return this.isTimeGame
			? this.timerService.getBlackTimer()
			: { seconds: -1 };
	}

	onBoardStatusChange = (status: IBoardStatus) => {
		const { inCheck, inCheckmate, inDraw: inDraw, inStalemate: inStalemate, inThreefoldRepetition: inThreefoldRepetition,
			inInsufficientMaterial: insufficientMaterial, inGameOver } = this.options;

		status.inCheck && inCheck && inCheck(status);
		status.inCheckmate && inCheckmate && inCheckmate(status);
		status.inDraw && inDraw && inDraw(status);
		status.inStalemate && inStalemate && inStalemate(status);
		status.inThreefoldRepetition && inThreefoldRepetition && inThreefoldRepetition(status);
		status.insufficientMaterial && insufficientMaterial && insufficientMaterial(status);
		status.gameOver && inGameOver && inGameOver(status);
	}

	onTimerExpired = (color: 'w' | 'b') => {
		if (this.options.onTimerExpired) {
			this.options.onTimerExpired(color);
		}
	}

	onDrop = (from: Square, to: Square) => {
		const shortMove: ShortMove = { to, from, promotion: 'q' };
		const oldFENPos = this.game.fen();
		const move = this.game.move(shortMove);

		// illegal move
		if (!move) {
			return 'snapback';
		}

		if (this.isTimeGame) {
			this.timerService.pauseTimer(move.color);
			this.timerService.startTimer(getOpositeTeam(move.color));
		}

		const gameStatus = this.getBoardStatus();
		this.onBoardStatusChange(gameStatus);
		var seconds = this.isTimeGame ? this.timerService.getTimer(move.color) : undefined;
		var newFENPos = this.game.fen();
		const moveEvent = this.chessFactory.createMoveEvent(move, gameStatus, oldFENPos, newFENPos, seconds);
		this.options.onDrop(moveEvent);
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