import { Component, OnInit } from '@angular/core';
import { MatchApiService } from 'src/app/services/match-api.service';
import { IMatchCreateDto } from 'src/app/models/match/matchCreateDto';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { routesConstants } from 'src/routes';

@Component({
	selector: 'app-live-matches-scene',
	templateUrl: './live-matches-scene.component.html',
	styleUrls: ['./live-matches-scene.component.css']
})
export class LiveMatchesSceneComponent implements OnInit {

	constructor(private matchApi: MatchApiService, private router: Router) { }

	ngOnInit() {
	}

	createMatch = (match: IMatchCreateDto) => {
		this.matchApi.createMatch(match).subscribe(
			res => { 
				if(true) {
					const id = (res as any).matchId;
					this.router.navigateByUrl(routesConstants.liveMatches + '/' + id);
				}
			},
			err => {

			}
		);
	}

}
