import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSceneComponent } from './game-scene/game-scene.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [GameSceneComponent, StatusCardComponent, ChatComponent],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
