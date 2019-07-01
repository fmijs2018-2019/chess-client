import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesSceneComponent } from './matches-scene/matches-scene.component';
import { MatchSceneComponent } from './match-scene/match-scene.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [
		MatchesSceneComponent,
		MatchSceneComponent
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
	]
})
export class MatchesModule { }
