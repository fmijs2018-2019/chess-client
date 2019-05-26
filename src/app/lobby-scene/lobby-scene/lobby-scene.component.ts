import { Component, OnInit, OnDestroy } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';
import { LobbyWebSocketService, LobbyEvents } from '../../core/services/lobby-web-socket.service';
import { ILobbyEvent } from 'src/app/models/events/ILobbyEvent';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-lobby-scene',
	templateUrl: './lobby-scene.component.html',
	styleUrls: ['./lobby-scene.component.css']
})
export class LobbySceneComponent implements OnInit, OnDestroy {

	challenges: IChallenge[];
	myChallenge: IChallenge;

	constructor(private lobbyWebSocketService: LobbyWebSocketService,
		private authService: AuthService) { }

	ngOnInit() {
		this.lobbyWebSocketService.connect()
		this.challenges = this.lobbyWebSocketService.getChallenges();
	}

	createChallenge() {

		const lobbyEvent: ILobbyEvent = {
			type: LobbyEvents.createChallenge,
			payload: {
				userId: this.authService.profilePaylaod.sub,
				pieces: 'black',
			}
		}
		this.lobbyWebSocketService.emitEvent(lobbyEvent, (ch: IChallenge) => this.myChallenge = ch);
	}

	clickRow(id: string) {
		console.log('scene', id);
		const isMyChallenge = this.myChallenge && this.myChallenge.id === id;

		if (isMyChallenge) {
			this.myChallenge = undefined;
		}

		const lobbyEvent: ILobbyEvent = {
			type: isMyChallenge ? LobbyEvents.removeChallenge : LobbyEvents.approveChallenge,
			payload: { challengeId: id, userId: this.authService.profilePaylaod.sub }
		}

		this.lobbyWebSocketService.emitEvent(lobbyEvent);
	}

	ngOnDestroy() {
	}
}
