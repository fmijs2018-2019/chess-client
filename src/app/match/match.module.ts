import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { ChatComponent } from './chat/chat.component';
import { ChessComponent } from './chess/chess.component';

@NgModule({
	declarations: [
		ChessboardComponent,
		ChatComponent,
		ChessComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		ChessboardComponent,
		ChatComponent,
		ChessComponent
	]
})
export class MatchModule { }
