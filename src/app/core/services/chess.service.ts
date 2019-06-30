import { Injectable } from '@angular/core';
import { BoardConfig, ChessBoardInstance, OrientationType, ChessBoardFactory } from 'chessboardjs';
import { ChessInstance, ShortMove, Square } from 'chess.js';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { IBoardStatus } from "src/app/models/api/IBoardStatus";
import { ChessFactoryService } from './chess-factory.service';
import * as moment from 'moment';
import { TimerService, ITimerOptions as ITimerInitOptions } from './timer.service';
import { IMatch } from 'src/app/models/api/IMatch';

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

export const getOpositePlayerColor = (color: 'w' | 'b') => color === 'w' ? 'b' : 'w';

export interface IBoardInitOptions {
	elementId: string,
	orientation: OrientationType,
	fen?: string,
	match: IMatch;
	moves: IMoveEvent[],
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
	private game: ChessInstance;
	private board: ChessBoardInstance;
	private options: IBoardInitOptions;
	private moves: IMoveEvent[];
	private defaultGameTime = 5 * 60;
	private match: IMatch;

	constructor(private chessFactory: ChessFactoryService,
		private timerService: TimerService) {

	}

	init = (options: IBoardInitOptions) => {
		this.options = options;
		this.match = options.match;
		this.moves = (options.moves || []).sort((a, b) => {
			return moment(a.serverTime).valueOf() - moment(b.serverTime).valueOf();
		});

		const cfg: BoardConfig = {
			draggable: true,
			position: options.fen || 'start',
			orientation: options.orientation,
			onDragStart: this.onDragStart as any,
			onDrop: this.onDrop as any,
			onSnapEnd: this.onSnapEnd as any,
		};

		if (this.match.isTimeGame) {
			const timerOptions: ITimerInitOptions = {
				gameTime: this.match.totalTime || this.defaultGameTime,
				onTimeExpire: this.onTimerExpired
			}
			this.timerService.init(timerOptions);
		}

		this.game = new Chess(options.fen);
		this.board = ChessBoard(options.elementId, cfg);

		if (this.moves.length > 0) {
			const lastMove = this.moves[this.moves.length - 1];
			this.game.load(lastMove.newFENPos);
			this.board.position(lastMove.newFENPos, false);

			if (this.match.isTimeGame) {
				// sync timer
				const now = moment().utc();
				const moveMadeAt = moment(lastMove.moveMadeAt).utc();
				this.timerService.setTimer(lastMove.color, lastMove.time);
				let elapsedTime = Math.round(moment.duration(now.diff(moveMadeAt)).asSeconds());
				
				const opositePlayerColor = getOpositePlayerColor(lastMove.color);
				let opositePlayerTime = 0;
				for (let i = this.moves.length - 1; i >= 0; i--) {
					const currentMove = this.moves[i];
					if (currentMove.color === opositePlayerColor) {
						opositePlayerTime = currentMove.time;
						elapsedTime += (this.match.totalTime - currentMove.time);
						break;
					}
				}

				if (this.match.isFinalized) {
					opositePlayerTime = this.match.timeExpired ? 0 : opositePlayerTime;
					this.timerService.setTimer(opositePlayerColor, opositePlayerTime);
				} else if (elapsedTime >= this.match.totalTime) {
					this.timerService.setTimer(opositePlayerColor, 0);
					this.onTimerExpired(opositePlayerColor)
				} else {
					this.timerService.setTimer(opositePlayerColor, this.match.totalTime - elapsedTime);
					this.timerService.startTimer(opositePlayerColor);
				}
			}
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
		
		this.moves.push(moveEvent);
		this.board.position(this.board.move(moveStr));
		const gameStatus = this.getBoardStatus();

		if (!gameStatus.gameOver) {
			this.match.isFinalized = true;
			this.match.isLive = false;
			this.match.winner = moveEvent.color;
		}

		if (this.match.isTimeGame) {
			this.timerService.pauseTimer(moveEvent.color);
			this.timerService.setTimer(moveEvent.color, moveEvent.time);
			if (!gameStatus.gameOver) {
				this.timerService.startTimer(getOpositePlayerColor(moveEvent.color));
			}
		}
		
		

		this.onBoardStatusChange(gameStatus);
		return true;
	}

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	onDragStart = (source: string, piece: string, position: string, orientation: string) => {
		const turn = this.game.turn();
		return !this.game.game_over() && turn === orientation[0] && turn === piece[0] && !this.match.isFinalized;
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
		return this.match.isTimeGame
			? this.timerService.getWhiteTimer()
			: { seconds: -1 };
	}

	getBlackTimer = () => {
		return this.match.isTimeGame
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
		this.match.timeExpired = true;
		this.match.isFinalized = true;
		this.match.isLive = false;
		this.match.winner = getOpositePlayerColor(color);

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

		const gameStatus = this.getBoardStatus();
		if (this.match.isTimeGame) {
			this.timerService.pauseTimer(move.color);
			if (!gameStatus.gameOver) {
				this.timerService.startTimer(getOpositePlayerColor(move.color));
			}
		}

		this.match.isFinalized = true;
		this.match.isLive = false;
		this.match.winner = move.color;

		var newFENPos = this.game.fen();
		var seconds = this.match.isTimeGame
		? this.timerService.getTimer(move.color)
		: undefined;
		const moveEvent = this.chessFactory.createMoveEvent(move, gameStatus, oldFENPos, newFENPos, seconds);
		this.moves.push(moveEvent);

		this.options.onDrop(moveEvent);
		this.onBoardStatusChange(gameStatus);
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