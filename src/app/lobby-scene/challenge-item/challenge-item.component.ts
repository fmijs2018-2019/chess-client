import { Component, OnInit, Input } from '@angular/core';
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

	@Input()
	color: string;

	faChess = faChess;

	constructor() { }

	ngOnInit() {
	}

}
