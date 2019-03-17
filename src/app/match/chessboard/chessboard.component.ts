import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChessService } from 'src/app/services/chess.service';
import { IEvent } from 'src/app/interfaces/events/IEvent';

@Component({
	selector: 'app-chessboard',
	templateUrl: './chessboard.component.html',
	styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements AfterViewInit, OnInit, OnDestroy {

	moveEvents: IEvent[] = [];
	connection: Subscription;
	@Input()
	room: string;

	constructor(private chess: ChessService) { }

	ngOnInit(): void {
		this.connection = this.chess.events.subscribe(ev => {
			ev.type == 'move' && this.moveEvents.push(ev);
		})
	}

	ngAfterViewInit(): void {
		this.chess.init('board', this.room);
	}

	ngOnDestroy(): void {
		this.connection.unsubscribe();
	}

	printMoves(): void {
		console.log(this.moveEvents);
	}
}
