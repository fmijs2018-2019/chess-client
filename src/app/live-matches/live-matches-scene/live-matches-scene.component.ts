import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchApiService } from 'src/app/services/match-api.service';
import { IMatchCreateDto, PiecesColor } from 'src/app/models/match/matchCreateDto';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { routesConstants } from 'src/routes';
import { Subscribable, Subscription } from 'rxjs';

@Component({
	selector: 'app-live-matches-scene',
	templateUrl: './live-matches-scene.component.html',
	styleUrls: ['./live-matches-scene.component.css']
})
export class LiveMatchesSceneComponent implements OnInit, OnDestroy {
	subscription: Subscription;

	constructor(private matchApi: MatchApiService, private router: Router) { };

	ngOnInit() {
	};

	createMatch = (match) => {
		this.matchApi.createMatch(match).subscribe(
			res => {
				if (res.isSuccess) {
					const id = res.data.matchId;
					this.router.navigate(['/livematches', id], { queryParams: { orientation: PiecesColor[match.orientation] } });
				}
			},
			err => {

			}
		);
	};

	ngOnDestroy = () => {
		this.subscription && this.subscription.unsubscribe();
	};

}
