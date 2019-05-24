import { Component, OnInit, Input } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';
import { faTimes, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-challenges-list',
	templateUrl: './challenges-list.component.html',
	styleUrls: ['./challenges-list.component.css']
})
export class ChallengesListComponent implements OnInit {

	@Input()
	challenges: IChallenge[];

	myChallenge: IChallenge = {
		id: '5',
		socketId: '1',
		sub: '1',
		pieces: 'black',
	};

	// icons
	faTimes = faTimes;
	faSignInAlt = faSignInAlt;

	constructor() { }

	ngOnInit() {
	}

}
