import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameWebSocketService, GameEvents } from 'src/app/core/services/game-web-socket.service.';
import { IGameEvent } from 'src/app/models/events/IGameEvent';
import { ActivatedRoute } from '@angular/router';
import { IMatch } from 'src/app/models/api/IMatch';
import { IBoardInitOptions, ChessService, EventType } from 'src/app/core/services/chess.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { ShortMove, Move } from 'chess.js';
import { IMatchMoves } from 'src/app/models/api/IMatchMoves';
import { IMatchMessages } from 'src/app/models/api/IMatchMessages';
import { IMessageEvent } from 'src/app/models/api/IMessageEvent';
import { ChessBoardInstance } from 'chessboardjs';
import { ChessTimer } from 'src/app/core/services/timer.service';
import { ChessUtils } from 'src/app/core/services/utils';
import { IBoardStatus } from 'src/app/models/api/IBoardStatus';
import * as moment from 'moment';

@Component({
	selector: 'app-game-scene',
	templateUrl: './game-scene.component.html',
	styleUrls: ['./game-scene.component.css']
})
export class GameSceneComponent implements OnInit, OnDestroy {

	matchId: string;
	match: IMatch;
	moves: IMoveEvent[];
	messages: IMessageEvent[];
	board: ChessBoardInstance;
	myTimer: ChessTimer;
	opponentTimer: ChessTimer;
	orientation: 'black' | 'white';
	opponentOrientation: string;
	boardStatus: IBoardStatus;

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
			this.match = match;
			const userId = this.authService.profilePaylaod.sub;
			this.orientation = this.match.blackP === userId ? 'black' : 'white';
			this.opponentOrientation = this.match.blackP !== userId ? 'black' : 'white';
			const options: IBoardInitOptions = {
				orientation: this.orientation,
				elementId: 'board',
				onDrop: this.onDrop,
				onBoardStatusChange: this.onBoardStatusChange,
				moves: matchMoves.moves || [],
				match: this.match,
				onTimerExpired: this.onTimeExpired
			}

			this.board = this.chessService.init(options);
			this.moves = this.chessService.getMoves();
			this.messages = (matchMessages.messages || []).sort((a, b) => {
				return moment(a.serverTime).valueOf() - moment(b.serverTime).valueOf();
			});

			this.myTimer = this.match.blackP === userId
				? this.chessService.getBlackTimer()
				: this.chessService.getWhiteTimer();

			this.opponentTimer = this.match.blackP === userId
				? this.chessService.getWhiteTimer()
				: this.chessService.getBlackTimer();

			window.addEventListener('resize', this.board.resize);
			this.boardStatus = this.chessService.getBoardStatus();

		});
	}

	ngOnDestroy(): void {
		this.gameWebSocketService.emitForceDisconnect();
		window.removeEventListener('resize', this.board.resize);
	}


	onTimeExpired = (color: 'b' | 'w') => {
		this.gameWebSocketService.emitTimeExpired(this.matchId, color);
	}

	getTimeStrFromSeconds = (seconds: number) => {
		return ChessUtils.getTimeStrFromSeconds(seconds);
	}

	onBoardStatusChange = (status: IBoardStatus) => {
		this.boardStatus.gameOver = status.gameOver;
		this.boardStatus.inCheck = status.inCheck;
		this.boardStatus.inCheckmate = status.inCheckmate;
		this.boardStatus.inDraw = status.inDraw;
		this.boardStatus.inStalemate = status.inStalemate;
		this.boardStatus.inThreefoldRepetition = status.inThreefoldRepetition;
		this.boardStatus.insufficientMaterial = status.insufficientMaterial;
	};

	// receive a move
	onMove = (move: IMoveEvent) => {
		this.chessService.move(move);
	}

	// receive a message
	onMessage = (message: IMessageEvent) => {
		console.log('received', message);
		this.messages.push(message);
	}

	// make a move
	onDrop = (move: IMoveEvent) => {
		this.gameWebSocketService.emitMove(this.matchId, move);
	}

	// send message
	sendMessage = (message: string) => {
		console.log(message);
		const messageEvent: IMessageEvent = {
			message: message,
			sender: this.authService.profilePaylaod.sub,
			type: EventType.MessageEvent,
		}
		this.gameWebSocketService.emitMessage(this.matchId, messageEvent);
		this.messages.push(messageEvent);
	}
}
