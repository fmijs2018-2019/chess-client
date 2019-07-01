import { Component, OnInit } from '@angular/core';
import { IMatch, MatchResult } from 'src/app/models/api/IMatch';
import { Router } from '@angular/router';
import { ChessApiService } from 'src/app/core/services/chess-api.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { IProfilePayload } from 'src/app/models/auth/IProfilePayload';
import { ChessUtils } from 'src/app/core/services/utils';

@Component({
	selector: 'app-matches-scene',
	templateUrl: './matches-scene.component.html',
	styleUrls: ['./matches-scene.component.css']
})
export class MatchesSceneComponent implements OnInit {

	public matches$: Observable<IMatch[]>;
	public profile: IProfilePayload;

	public keys = Object.keys;
	public matchResults = MatchResult;

	constructor(private router: Router,
		private chessApiService: ChessApiService,
		private authService: AuthService) {
	}

	ngOnInit() {
		this.matches$ = this.chessApiService.getAllMatches();
		this.profile = Object.assign({}, this.authService.profilePaylaod);
	}

	public onMatchClick(matchId: string) {
		this.router.navigate(['/matches', matchId]);
	}
	
	getTimeStr(time: number) {
		return ChessUtils.getTimeStrFromSeconds(time);
	}

	getDateStr(fullDate: string) {
		const date = new Date(fullDate);

		const d = date.getDate() < 9 ? '0' + date.getDate() : date.getDate();
		const m = date.getMonth() < 9 ? '0' + date.getMonth() : date.getMonth();
		const h = date.getHours() < 9 ? '0' + date.getHours() : date.getHours();
		const min = date.getMinutes() < 9 ? '0' + date.getMinutes() : date.getMinutes();

		return `${d}/${m}/${date.getFullYear()} ${h}:${min}`;
	}
}
