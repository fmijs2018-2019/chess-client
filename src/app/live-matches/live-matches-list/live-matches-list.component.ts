import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMatchItem } from 'src/app/models/match/matchItem';
import { MatchApiService } from 'src/app/services/match-api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { routesConstants } from 'src/routes';
import { PiecesColor } from 'src/app/models/match/matchCreateDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-live-matches-list',
	templateUrl: './live-matches-list.component.html',
	styleUrls: ['./live-matches-list.component.css']
})
export class LiveMatchesListComponent implements OnInit, OnDestroy {

	matches: any;
	subscription: Subscription;

	constructor(private matchApiService: MatchApiService, private router: Router, private authService: AuthService) { }

	ngOnInit() {
		this.subscription = this.getLiveMatches();
	};

	getLiveMatches() {
		return this.matchApiService.getAllMatches().subscribe(
			res => {
				if (res.isSuccess) {
					this.matches = res.data.liveMatches;
				}
			}
		);
	}

	ngOnDestroy() {
		this.subscription && this.subscription.unsubscribe();
	};

	onJoinClick(matchId: string) {
		this.matchApiService.joinMatch(matchId)
			.subscribe(
				res => {
					if (res.isSuccess) {
						const fen = res.data && res.data.fen;
						const sub = this.authService.profilePaylaod.sub;
						const orientation = this.matches[matchId].match.blackP === sub ? PiecesColor.black : PiecesColor.white;
						this.router.navigate(['/livematches', matchId], { queryParams: { orientation, fen } });
					}
				},
				err => {
					console.log("error", err);
				});
	}
};