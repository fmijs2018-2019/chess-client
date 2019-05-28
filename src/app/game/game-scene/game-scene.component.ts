import { Component, OnInit } from '@angular/core';
import { GameWebSocketService, GameEvents } from 'src/app/core/services/game-web-socket.service.';
import { IGameEvent } from 'src/app/models/events/IGameEvent';
import { ActivatedRoute } from '@angular/router';
import { IMatch } from 'src/app/models/api/IMatch';
import { IBoardInitOptions, ChessService } from 'src/app/core/services/chess.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IMove } from 'src/app/models/api/IMove';
import { ShortMove, Move } from 'chess.js';
import { IMatchMoves } from 'src/app/models/api/IMatchMoves';
import { IMatchMessages } from 'src/app/models/api/IMatchMessages';
import { IMessage } from 'src/app/models/api/IMessage';

@Component({
	selector: 'app-game-scene',
	templateUrl: './game-scene.component.html',
	styleUrls: ['./game-scene.component.css']
})
export class GameSceneComponent implements OnInit {

	matchId: string;
	match: IMatch;
	moves: IMove[];
	messages: IMessage[];
	board;

	constructor(private gameWebSocketService: GameWebSocketService,
		private activatedRoute: ActivatedRoute,
		private authService: AuthService,
		private chessService: ChessService) { }

	ngOnInit() {
		this.gameWebSocketService.connect(this.onMove, this.onMessage);
		this.activatedRoute.params.subscribe(params => this.matchId = params['id']);

		const event: IGameEvent = {
			type: GameEvents.joinGame,
			payload: this.matchId
		}

		this.gameWebSocketService.emitEvent(event, (match: IMatch, matchMoves: IMatchMoves, matchMessages: IMatchMessages) => {
			this.match = match;
			const userId = this.authService.profilePaylaod.sub;
			const options: IBoardInitOptions = {
				orientation: this.match.blackP === userId ? 'black' : 'white',
				elementId: 'board',
				onDrop: this.onDrop
			}

			this.board = this.chessService.init(options);
		});
	}

	// when receive a move
	onMove = (move: IMove) => {
		this.chessService.move(move.from, move.to);
	}

	onMessage = (message: any) => {

	}

	// when make a move
	onDrop = (move: IMove) => {
		const event: IGameEvent = {
			type: GameEvents.makeMove,
			payload: { matchId: this.matchId, move }
		}
		this.gameWebSocketService.emitEvent(event);
	}

	sendMessage = (message: any) => {
		const event: IGameEvent = {
			type: GameEvents.sendMesssage,
			payload: {}
		}
		this.gameWebSocketService.emitEvent(event);
	}
}
