import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { MatchApiService } from './services/match-api.service';
import { LobbyWebSocketService } from './services/lobby-web-socket.service';
import { GameWebSocketService } from './services/game-web-socket.service.';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		AuthGuard,
		AuthService,
		MatchApiService,
		LobbyWebSocketService,
		GameWebSocketService
	]
})
export class CoreModule { }
