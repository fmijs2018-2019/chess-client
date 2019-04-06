import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveMatchSceneComponent } from './live-match-scene/live-match-scene.component';
import { ChessboardComponent } from './chessboard/chessboard.component';

@NgModule({
	declarations: [
		LiveMatchSceneComponent,
		ChessboardComponent
	],
	imports: [
		CommonModule
	]
})
export class LiveMatchModule { }
