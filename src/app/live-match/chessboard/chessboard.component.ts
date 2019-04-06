import { Component, OnInit, Input } from '@angular/core';
import { ChessService } from 'src/app/services/chess.service';

@Component({
	selector: 'app-chessboard',
	templateUrl: './chessboard.component.html',
	styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {

	@Input()
	matchId: string;

	@Input()
	orientation: 'white' | 'black';

	@Input()
	fen: string = 'start';

	constructor(private chessService: ChessService) { }

	ngOnInit() {
		this.chessService.init('board', this.matchId, this.orientation, this.fen);
	}

}
