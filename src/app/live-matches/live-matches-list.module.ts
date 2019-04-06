import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMatchModalComponent } from './create-match-modal/create-match-modal.component';
import { LiveMatchesSceneComponent } from './live-matches-scene/live-matches-scene.component';
import { MatchApiService } from '../services/match-api.service';
import { LiveMatchesListComponent } from './live-matches-list/live-matches-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		CreateMatchModalComponent,
		LiveMatchesSceneComponent,
		LiveMatchesListComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule
	],
	providers: [
		MatchApiService,
	]
})
export class LiveMatchesListModule { }
