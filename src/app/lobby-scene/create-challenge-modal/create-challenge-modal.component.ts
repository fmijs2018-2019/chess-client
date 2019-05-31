import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-create-challenge-modal',
	templateUrl: './create-challenge-modal.component.html',
	styleUrls: ['./create-challenge-modal.component.css']
})
export class CreateChallengeModalComponent implements OnInit, OnDestroy {

	constructor(public bsModalRef: BsModalRef, private modalService: BsModalService) { }

	piecesColor = new FormControl('white');

	ngOnInit() {
	}

	createChallenge() {
		this.bsModalRef.content = {piecesColor: this.piecesColor.value, time: null};
		this.bsModalRef.hide();
	}

	ngOnDestroy() {
	}
}
