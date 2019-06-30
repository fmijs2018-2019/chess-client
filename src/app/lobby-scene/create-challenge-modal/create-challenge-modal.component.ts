import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-create-challenge-modal',
	templateUrl: './create-challenge-modal.component.html',
	styleUrls: ['./create-challenge-modal.component.css']
})
export class CreateChallengeModalComponent implements OnInit, OnDestroy {

	@Output()
	action = new EventEmitter();

	constructor(public bsModalRef: BsModalRef) { }

	piecesColor = new FormControl('white');
	time = new FormControl(-1);

	ngOnInit() {
	}

	createChallenge() {
		let time = this.time.value !== "-1" ? +this.time.value : null;
		this.action.emit({ piecesColor: this.piecesColor.value, time });
	}

	ngOnDestroy() {
	}
}
