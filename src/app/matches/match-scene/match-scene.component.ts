import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardConfig, ChessBoardFactory } from 'chessboardjs';
import { Subscription } from 'rxjs';
import { ChessApiService } from 'src/app/core/services/chess-api.service';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { IMatch } from 'src/app/models/api/IMatch';
import { AuthService } from 'src/app/core/services/auth.service';
import { faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';

declare const ChessBoard: ChessBoardFactory;

@Component({
	selector: 'app-match-scene',
	templateUrl: './match-scene.component.html',
	styleUrls: ['./match-scene.component.css']
})
export class MatchSceneComponent implements OnInit, OnDestroy {

	public faStepForward = faStepForward;
	public faStepBackward = faStepBackward;

	board;
	currentMoveIndex: number = -1;
	matchId: string;
	match: IMatch;
	moves: IMoveEvent[] = [];
	isPrevDisabled = true;
	isNextDisabled = true;

	subscription = new Subscription();

	constructor(private activatedRoute: ActivatedRoute,
		private chessApiService: ChessApiService,
		private authService: AuthService) { }

	ngOnInit() {
		this.subscription.add(this.activatedRoute.params.subscribe(params => {
			this.matchId = params['id']

			this.subscription.add(this.chessApiService.getMatch(this.matchId).subscribe(m => {
				this.match = Object.assign({}, m);
	
				const cfg: BoardConfig = {
					draggable: false,
					position: 'start',
					orientation: this.match.whiteP === this.authService.profilePaylaod.sub ? 'white' : 'black'
				};
				this.board = ChessBoard('board', cfg);
			}));

			this.subscription.add(this.chessApiService.getMoves(this.matchId).subscribe((moves) => {
				this.moves = Object.assign([], moves);
	
				this.isNextDisabled = this.moves.length <= 0;
			}));
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onMoveClick(index: number) {
		this.currentMoveIndex = index;
		this.board.position(this.moves[index].newFENPos);

		this.setButtonsEnabling();
	}

	onPrevClick() {
		if (this.currentMoveIndex > 0) {
			this.currentMoveIndex--;
			this.board.position(this.moves[this.currentMoveIndex].newFENPos);
		}else if (this.currentMoveIndex === 0) {
			this.currentMoveIndex--;
			this.board.position('start');
		}
		
		this.setButtonsEnabling();
	}

	onNextClick() {
		if (this.currentMoveIndex < this.moves.length - 1) {
			this.currentMoveIndex++;
			this.board.position(this.moves[this.currentMoveIndex].newFENPos);
		}

		this.setButtonsEnabling();
	}

	onStartClick() {
		this.board.position('start');
		this.currentMoveIndex = -1;
		this.isPrevDisabled = true;
	}

	setButtonsEnabling() {
		this.isPrevDisabled = this.currentMoveIndex < 0;
		this.isNextDisabled = this.currentMoveIndex >= this.moves.length - 1;
	}
}
