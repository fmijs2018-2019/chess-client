import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesSceneComponent } from './matches-scene/matches-scene.component';
import { MatchSceneComponent } from './match-scene/match-scene.component';

@NgModule({
	declarations: [
		MatchesSceneComponent,
		MatchSceneComponent
	],
	imports: [
		CommonModule
	]
})
export class MatchesModule { }
