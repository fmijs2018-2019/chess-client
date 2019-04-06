import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMatchCreateDto, PiecesColor } from 'src/app/models/match/matchCreateDto';

@Component({
	selector: 'app-create-match-modal',
	templateUrl: './create-match-modal.component.html',
	styleUrls: ['./create-match-modal.component.css']
})
export class CreateMatchModalComponent implements OnInit {

	orientation: string = PiecesColor.white;

	@Output()
	onSave: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	onClick = () => {
		const match: IMatchCreateDto = { orientation: PiecesColor[this.orientation] }
		this.onSave.emit(match);
	}

}
