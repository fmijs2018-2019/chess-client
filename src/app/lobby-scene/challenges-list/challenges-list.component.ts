import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';
import { faTimes, faSignInAlt, faChess } from '@fortawesome/free-solid-svg-icons';
import { ChessUtils } from 'src/app/core/services/utils';

@Component({
	selector: 'app-challenges-list',
	templateUrl: './challenges-list.component.html',
	styleUrls: ['./challenges-list.component.css']
})
export class ChallengesListComponent implements OnInit {

	@Input()
	challenges: IChallenge[];

	@Input()
	myChallenge: IChallenge;

	@Output()
	onRowClick = new EventEmitter<string>();
	
	// icons
	faTimes = faTimes;
	faSignInAlt = faSignInAlt;
	faChess = faChess;

	constructor() { }

	getTimeStrFromSeconds = (seconds: number) => {
		return ChessUtils.getTimeStrFromSeconds(seconds);
	}

	ngOnInit() {
	}

	clickRow(id: string) {
		this.onRowClick.emit(id);
	}
}

