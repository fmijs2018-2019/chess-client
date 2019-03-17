import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';

@Component({
	selector: 'app-chess',
	templateUrl: './chess.component.html',
	styleUrls: ['./chess.component.css']
})
export class ChessComponent implements OnInit {
	wsEvents: Subject<any>
	room: string;

	constructor(private wsService: WebsocketService) {
	}

	ngOnInit() {
		this.wsService.joinMatch('test');
		this.room = 'test';
	}

}
