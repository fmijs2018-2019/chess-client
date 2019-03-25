import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMatchModalComponent } from './create-match-modal/create-match-modal.component';
import { LiveMatchesSceneComponent } from './live-matches-scene/live-matches-scene.component';
import { MatchApiService } from '../services/match-api.service';

@NgModule({
	declarations: [
		CreateMatchModalComponent,
		LiveMatchesSceneComponent
	],
	imports: [
		CommonModule
	],
	providers: [
		MatchApiService
	]
	// exports: [
	// 	RoomsSceneComponent,
	// 	RoomsListComponent,
	// 	RoomItemComponent
	// ]
})
export class LiveMatchesListModule { }
