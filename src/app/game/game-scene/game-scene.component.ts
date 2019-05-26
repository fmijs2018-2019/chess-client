import { Component, OnInit } from '@angular/core';
import { GameWebSocketService, GameEvents } from 'src/app/core/services/game-web-socket.service.';
import { IGameEvent } from 'src/app/models/events/IGameEvent';
import { ActivatedRoute } from '@angular/router';
import { IMatch } from 'src/app/models/match/IMatch';
import { IBoardInitOptions, ChessService } from 'src/app/core/services/chess.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-game-scene',
	templateUrl: './game-scene.component.html',
	styleUrls: ['./game-scene.component.css']
})
export class GameSceneComponent implements OnInit {

	matchId: string;
	match: IMatch;
	board;

	constructor(private gameWebSocketService: GameWebSocketService,
		private activatedRoute: ActivatedRoute,
		private authService: AuthService,
		private chessService: ChessService) { }

	ngOnInit() {
		this.gameWebSocketService.connect();
		this.activatedRoute.params.subscribe(params => this.matchId = params['id']);

		const event: IGameEvent = {
			type: GameEvents.joinGame,
			payload: this.matchId
		}

		this.gameWebSocketService.emitEvent(event, (match: IMatch) => {
			this.match = match;
			const userId = this.authService.profilePaylaod.sub;
			const options: IBoardInitOptions = {
				orientation: this.match.blackP === userId ? 'black' : 'white',
				elementId: 'board'
			}

			this.board = this.chessService.init(options);
			console.log(match);
		});
	}

}
