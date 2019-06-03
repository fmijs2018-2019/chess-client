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

	ngOnInit() {
	}

	createChallenge() {
		this.action.emit({ piecesColor: this.piecesColor.value, time: null });
	}

	ngOnDestroy() {
	}
}
