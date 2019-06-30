import { Component, OnInit, Input } from '@angular/core';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { ChessUtils } from 'src/app/core/services/utils';

@Component({
	selector: 'app-moves-history-card',
	templateUrl: './moves-history-card.component.html',
	styleUrls: ['./moves-history-card.component.css']
})
export class MovesHistoryCardComponent implements OnInit {

	@Input()
	moves: IMoveEvent[];

	constructor() { }

	ngOnInit() {
	}

	getTimeStrFromSeconds = (seconds: number) => {
		return ChessUtils.getTimeStrFromSeconds(seconds);
	}

}
