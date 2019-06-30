import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-moves-history-card',
	templateUrl: './moves-history-card.component.html',
	styleUrls: ['./moves-history-card.component.css']
})
export class MovesHistoryCardComponent implements OnInit {

	moves = [
		'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 
		'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 
		'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 
		'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 
		'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 
		'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', 'h2-a8', 'b4-b5', 'c4-b4', ]

	constructor() { }

	ngOnInit() {
	}

}
