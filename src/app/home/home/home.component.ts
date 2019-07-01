import { Component, OnInit } from '@angular/core';
import { faChess, faChessQueen, faChessKnight } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public faChess = faChess;
	public faChessQueen = faChessQueen;
	public faChessKnight = faChessKnight;

	constructor() { }

	ngOnInit() {
	}

}
