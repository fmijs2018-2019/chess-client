import { Component, OnInit } from '@angular/core';
import { IMatch } from 'src/app/models/api/IMatch';
import { Router } from '@angular/router';

@Component({
	selector: 'app-matches-scene',
	templateUrl: './matches-scene.component.html',
	styleUrls: ['./matches-scene.component.css']
})
export class MatchesSceneComponent implements OnInit {

	matches: IMatch[] = [
		{
			id: '1',
			result: 'checkmate',
			totalTime: 500000,
			whiteP: 'anonymous',
			blackP: 'anonymous',
			startTime: new Date().toUTCString(),
			endTime: new Date().toUTCString(),
			isLive: false,
			isFinalized: true,
			winner: 'white'
		},
		{
			id: '1',
			result: 'checkmate',
			totalTime: 500000,
			whiteP: 'anonymous',
			blackP: 'anonymous',
			startTime: new Date().toUTCString(),
			endTime: new Date().toUTCString(),
			isLive: false,
			isFinalized: true,
			winner: 'black'
		},
		{
			id: '1',
			result: 'checkmate',
			totalTime: 500000,
			whiteP: 'anonymous',
			blackP: 'anonymous',
			startTime: new Date().toUTCString(),
			endTime: new Date().toUTCString(),
			isLive: false,
			isFinalized: true,
			winner: 'white'
		},
	]

	constructor(private router: Router) { }

	ngOnInit() {
	}

	public onMatchClick(matchId: string) {
		this.router.navigate(['/matches', matchId]);
	}
}
