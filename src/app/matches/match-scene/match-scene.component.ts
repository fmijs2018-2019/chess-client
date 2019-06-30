import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardConfig, ChessBoardFactory } from 'chessboardjs';
import { Subscription } from 'rxjs';
import { ChessApiService } from 'src/app/core/services/chess-api.service';
import { IMove } from 'src/app/models/api/IMove';

declare const ChessBoard: ChessBoardFactory;

@Component({
	selector: 'app-match-scene',
	templateUrl: './match-scene.component.html',
	styleUrls: ['./match-scene.component.css']
})
export class MatchSceneComponent implements OnInit, OnDestroy {
	board;
	currentMoveIndex: number = -1;
	matchId: string;
	moves: IMove[] = [];
	isPrevDisabled = true;
	isNextDisabled = true;

	subscription = new Subscription();

	constructor(private activatedRoute: ActivatedRoute,
		private chessApiService: ChessApiService) { }

	ngOnInit() {
		this.subscription.add(this.activatedRoute.params.subscribe(params => this.matchId = params['id']));
		this.subscription.add(this.chessApiService.getMoves(this.matchId).subscribe((moves) => {
			this.moves = Object.assign([], moves);

			this.isNextDisabled = this.moves.length <= 0;
		}));

		const cfg: BoardConfig = {
			draggable: false,
			position: 'start',
			orientation: 'white'
		};
		this.board = ChessBoard('board', cfg);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onMoveClick(index: number) {
		this.currentMoveIndex = index;
		this.board.position(this.moves[index].newFENPos);
	}

	onPrevClick() {
		if (this.currentMoveIndex > 0) {
			this.currentMoveIndex--;
			this.board.position(this.moves[this.currentMoveIndex].newFENPos);
		}else if (this.currentMoveIndex === 0) {
			this.currentMoveIndex--;
			this.board.position('start');
		}
		
		this.isPrevDisabled = this.currentMoveIndex < 0;
		this.isNextDisabled = this.currentMoveIndex >= this.moves.length - 1;
	}

	onNextClick() {
		if (this.currentMoveIndex < this.moves.length - 1) {
			this.currentMoveIndex++;
			this.board.position(this.moves[this.currentMoveIndex].newFENPos);
		}

		this.isPrevDisabled = this.currentMoveIndex < 0;
		this.isNextDisabled = this.currentMoveIndex >= this.moves.length - 1;
	}

	onStartClick() {
		this.board.position('start');
		this.currentMoveIndex = -1;
		this.isPrevDisabled = true;
	}
}
