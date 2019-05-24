// import { Injectable } from '@angular/core';
// import { ChessBoardFactory } from 'chessboardjs';
// import { ChessInstance, ShortMove } from 'chess.js';
// import { IMoveEvent } from '../../models/events/move';
// import { EventType } from '../../models/events/eventTypes';
// import { Subscription } from 'rxjs';
// import { WebsocketService } from './websocket.service';
// import { AuthService } from './auth.service';

// declare const Chess: {
//     /**
//      * The Chess() constructor takes an optional parameter which specifies
//      * the board configuration in Forsyth-Edwards Notation.
//      * @param fen specifies the board configuration in Forsyth-Edwards Notation.
//      */
// 	(fen?: string): ChessInstance;

//     /**
//      * The Chess() constructor takes an optional parameter which specifies
//      * the board configuration in Forsyth-Edwards Notation.
//      * @param fen specifies the board configuration in Forsyth-Edwards Notation.
//      */
// 	new(fen?: string): ChessInstance;
// };
// declare const ChessBoard: ChessBoardFactory;
// declare const $: any;

// @Injectable({
// 	providedIn: 'root'
// })
// export class ChessService {
// 	game: ChessInstance;
// 	board: any;
// 	room: string;
// 	orientation: string;
// 	moves: IMoveEvent[] = [];
// 	subscription: Subscription

// 	constructor(private wsSevice: WebsocketService, private authService: AuthService) {
// 		this.subscription = wsSevice.events.subscribe(e => {
// 			if(e.type === EventType.move) {
// 				this.moves.push(e as IMoveEvent);

// 				const shortMove = (e as IMoveEvent).shortMove;
// 				const moveStr = `${shortMove.from}-${shortMove.to}`;

// 				this.board.position(this.board.move(moveStr));
// 				this.game.move(shortMove);
// 			}
// 		});
// 	}

// 	init = (elementId: string, room: string, orientation: string, fen: string = 'start') => {
// 		this.room = room;
// 		this.orientation = orientation;
// 		this.game = Chess(fen);
// 		const cfg = {
// 			draggable: true,
// 			position: fen,
// 			orientation,
// 			onDragStart: this.onDragStart,
// 			onDrop: this.onDrop,
// 			onSnapEnd: this.onSnapEnd
// 		};
// 		this.board = ChessBoard(elementId, cfg);

// 		// this.updateStatus();
// 	}

// 	updateStatus = () => {
// 		let status = '';

// 		let moveColor = 'White';
// 		if (this.game.turn() === 'b') {
// 			moveColor = 'Black';
// 		}

// 		// checkmate?
// 		if (this.game.in_checkmate()) {
// 			status = 'Game over, ' + moveColor + ' is in checkmate.';
// 		} else if (this.game.in_draw()) { // draw?
// 			status = 'Game over, drawn position';
// 		} else { // game still on
// 			status = moveColor + ' to move';

// 			// check?
// 			if (this.game.in_check()) {
// 				status += ', ' + moveColor + ' is in check';
// 			}
// 		}
// 	};
// 	// do not pick up pieces if the game is over
// 	// only pick up pieces for the side to move
// 	onDragStart = (source, piece, position, orientation) => {
// 		const turn = this.game.turn();
// 		return !this.game.game_over() && turn === orientation[0] && turn === piece[0];
// 	};

// 	onDrop = (source, target) => {
// 		const shortMove: ShortMove = {
// 			from: source,
// 			to: target,
// 			promotion: 'q'
// 		}
// 		// see if the move is legal
// 		const move = this.game.move(shortMove);

// 		// illegal move
// 		if (!move) { return 'snapback'; }

// 		const moveEvent: IMoveEvent = {
// 			type: EventType.move,
// 			room: this.room,
// 			sender: this.authService.profilePaylaod.sub,
// 			shortMove,
// 			fen: this.game.fen()
// 		};
// 		this.wsSevice.events.next(moveEvent);
// 		// this.updateStatus();
// 	};

// 	// update the board position after the piece snap
// 	// for castling, en passant, pawn promotion
// 	onSnapEnd = () => {
// 		this.board.position(this.game.fen());
// 	};
// }
