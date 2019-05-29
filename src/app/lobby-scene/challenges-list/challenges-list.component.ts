import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';
import { faTimes, faSignInAlt, faChess } from '@fortawesome/free-solid-svg-icons';

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

	// icons
	faTimes = faTimes;
	faSignInAlt = faSignInAlt;
	faChess = faChess;
	
	constructor() { }
	
	ngOnInit() {
	}

	@Output()
	onRowClick = new EventEmitter<string>();

	clickRow(id: string) {
		this.onRowClick.emit(id);
	}
}

