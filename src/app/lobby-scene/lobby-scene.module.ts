import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesListComponent } from './challenges-list/challenges-list.component';
import { LobbySceneComponent } from './lobby-scene/lobby-scene.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [
		ChallengesListComponent,
		LobbySceneComponent
	],
	imports: [
		CommonModule,
		FontAwesomeModule
	],
	providers: [

	],
	exports: [
		LobbySceneComponent
	]
})
export class LobbySceneModule { }
