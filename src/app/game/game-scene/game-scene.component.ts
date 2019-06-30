import { Component, OnInit } from '@angular/core';
import { GameWebSocketService, GameEvents } from 'src/app/core/services/game-web-socket.service.';
import { IGameEvent } from 'src/app/models/events/IGameEvent';
import { ActivatedRoute } from '@angular/router';
import { IMatch } from 'src/app/models/api/IMatch';
import { IBoardInitOptions, ChessService } from 'src/app/core/services/chess.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { ShortMove, Move } from 'chess.js';
import { IMatchMoves } from 'src/app/models/api/IMatchMoves';
import { IMatchMessages } from 'src/app/models/api/IMatchMessages';
import { IMessageEvent } from 'src/app/models/api/IMessageEvent';
import { ChessBoardInstance } from 'chessboardjs';

@Component({
	selector: 'app-game-scene',
	templateUrl: './game-scene.component.html',
	styleUrls: ['./game-scene.component.css']
})
export class GameSceneComponent implements OnInit {

	matchId: string;
	match: IMatch;
	moves: IMoveEvent[];
	messages: IMessageEvent[];
	board: ChessBoardInstance;

	constructor(private gameWebSocketService: GameWebSocketService,
		private activatedRoute: ActivatedRoute,
		private authService: AuthService,
		private chessService: ChessService) { }

	ngOnInit() {
		const gameSocketIoOptions = {
			onMove: this.onMove,
			onMessage: this.onMessage
		};
		this.gameWebSocketService.connect(gameSocketIoOptions);
		this.activatedRoute.params.subscribe(params => this.matchId = params['id']);

		this.gameWebSocketService.emitJoinGame(this.matchId, (match: IMatch, matchMoves: IMatchMoves, matchMessages: IMatchMessages) => {
			console.log(match, matchMoves, matchMessages)
			this.match = match;
			const userId = this.authService.profilePaylaod.sub;
			const options: IBoardInitOptions = {
				orientation: this.match.blackP === userId ? 'black' : 'white',
				elementId: 'board',
				onDrop: this.onDrop,
				isTimeGame: false,
				moves: matchMoves.moves || []
			}

			this.board = this.chessService.init(options);
		});
	}

	// receive a move
	onMove = (move: IMoveEvent) => {
		this.chessService.move(move);
	}

	// receive a message
	onMessage = (message: any) => {

	}

	// make a move
	onDrop = (move: IMoveEvent) => {
		this.gameWebSocketService.emitMove(this.matchId, move);
	}

	// send message
	sendMessage = (message: any) => {
		
	}
}
