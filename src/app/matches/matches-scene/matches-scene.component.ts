import { Component, OnInit } from '@angular/core';
import { IMatch } from 'src/app/models/api/IMatch';
import { Router } from '@angular/router';
import { ChessApiService } from 'src/app/core/services/chess-api.service';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { IProfilePayload } from 'src/app/models/auth/IProfilePayload';

@Component({
	selector: 'app-matches-scene',
	templateUrl: './matches-scene.component.html',
	styleUrls: ['./matches-scene.component.css']
})
export class MatchesSceneComponent implements OnInit {

	public matches$: Observable<IMatch[]>;
	public profile: IProfilePayload;

	constructor(private router: Router,
		private chessApiService: ChessApiService,
		private authService: AuthService) {
	}

	ngOnInit() {
		this.matches$ = this.chessApiService.getAllMatches();
		this.profile = Object.assign({}, this.authService.profilePaylaod);
	}

	public onMatchClick(matchId: string) {
		console.log(matchId);
		this.router.navigate(['/matches', matchId]);
	}
}
