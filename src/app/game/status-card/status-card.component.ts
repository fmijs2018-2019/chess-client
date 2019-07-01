import { Component, OnInit, Input } from '@angular/core';
import { IBoardStatus } from 'src/app/models/api/IBoardStatus';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChessUtils } from 'src/app/core/services/utils';
import { IMatch, MatchResult } from 'src/app/models/api/IMatch';
import { Router } from '@angular/router';

@Component({
	selector: 'app-status-card',
	templateUrl: './status-card.component.html',
	styleUrls: ['./status-card.component.css']
})
export class StatusCardComponent implements OnInit {

	@Input()
	boardStatus: IBoardStatus;

	@Input()
	orientation: string;

	@Input()
	opponentOrientation: string;

	@Input()
	match: IMatch;

	@Input()
	moves: IMoveEvent[];

	name: string = '';

	constructor(private authService: AuthService, private router: Router) {
		this.name = authService.profilePaylaod.name || '';
	}

	getTimeStrFromSeconds = (seconds: number) => {
		return ChessUtils.getTimeStrFromSeconds(seconds);
	}

	get status () {
		if (!this.boardStatus) {
			return '';
		} else if (this.boardStatus.inCheckmate) {
			return 'checkmate';
		} else if (this.boardStatus.inStalemate) {
			return 'stalemate';
		} else if (this.boardStatus.inThreefoldRepetition) {
			return 'threeefold repetition';
		} else if (this.boardStatus.insufficientMaterial) {
			return 'insufficient material';
		} else if (this.boardStatus.inCheck) {
			return 'check';
		} else if (this.boardStatus.inDraw) {
			return 'draw';
		} else if (this.match && this.match.timeExpired) {
			return 'time expired'
		}
		return '';
	}

	get winnerText () {
		if (!this.match) {
			return '';
		} else if (this.match.matchResult === MatchResult.Checkmate || this.match.matchResult === MatchResult.OutOfTime) {
			const winner = this.match.winner === 'w' ? 'white' : 'black';
			return  winner === this.orientation ? 'You won!' : 'You lost!';
		} else {
			return '';
		}
	}

	backToLobby = () => {
		this.router.navigate(['/lobby']);
	}

	ngOnInit() {
	}

}
