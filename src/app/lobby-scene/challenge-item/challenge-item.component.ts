import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';
import { IconDefinition, faChess } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-challenge-item',
	templateUrl: './challenge-item.component.html',
	styleUrls: ['./challenge-item.component.css']
})
export class ChallengeItemComponent implements OnInit {

	@Input()
	challenge: IChallenge;

	@Input()
	isMyChallenge: boolean;

	@Input()
	icon: IconDefinition;

	@Output()
	onRowClick = new EventEmitter<string>();

	@Input()
	color: string;

	faChess = faChess;

	constructor() { }

	ngOnInit() {
	}

	clickRow() {
		console.log('click', this.challenge);
		this.onRowClick.emit(this.challenge.id);
	}
}
