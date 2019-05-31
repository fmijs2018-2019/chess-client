import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChallengesListComponent } from './challenges-list/challenges-list.component';
import { LobbySceneComponent } from './lobby-scene/lobby-scene.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateChallengeModalComponent } from './create-challenge-modal/create-challenge-modal.component';

@NgModule({
	declarations: [
		ChallengesListComponent,
		LobbySceneComponent,
		CreateChallengeModalComponent
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		ReactiveFormsModule,
	],
	providers: [

	],
	entryComponents: [
		CreateChallengeModalComponent
	],
	exports: [
		LobbySceneComponent
	]
})
export class LobbySceneModule { }
