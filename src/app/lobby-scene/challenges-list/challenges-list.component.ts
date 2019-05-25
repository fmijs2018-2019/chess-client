import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

	@Input()
	myChallenge: IChallenge;

	// icons
	faTimes = faTimes;
	faSignInAlt = faSignInAlt;
	
	constructor() { }
	
	ngOnInit() {
	}

	@Output()
	onRowClick = new EventEmitter<string>();

	clickRow(id: string) {
		console.log('list', id)
		this.onRowClick.emit(id);
	}
}

