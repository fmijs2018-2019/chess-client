import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSceneComponent } from './game-scene/game-scene.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ChatComponent } from './chat/chat.component';
import { MovesHistoryCardComponent } from './moves-history-card/moves-history-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [GameSceneComponent, StatusCardComponent, ChatComponent, MovesHistoryCardComponent],
	imports: [
		CommonModule,
		FormsModule
	]
})
export class GameModule { }
