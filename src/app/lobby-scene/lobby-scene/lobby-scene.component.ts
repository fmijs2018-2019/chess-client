import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';
import { LobbyWebSocketService, LobbyEvents } from '../../core/services/lobby-web-socket.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { ILobbyEvent } from 'src/app/models/events/ILobbyEvent';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-lobby-scene',
	templateUrl: './lobby-scene.component.html',
	styleUrls: ['./lobby-scene.component.css']
})
export class LobbySceneComponent implements OnInit, OnDestroy {

	challenges: IChallenge[];
	subject: Subject<any>;
	subscriptions: Subscription[] = [];

	constructor(private lobbyWebSocketService: LobbyWebSocketService,
		private authService: AuthService,
		private changeDetector: ChangeDetectorRef) { }

	ngOnInit() {
		this.lobbyWebSocketService.connect()
		this.challenges = this.lobbyWebSocketService.getChallenges();
		// this.subject = this.lobbyWebSocketService.connect();
		// this.subscriptions.push(this.subject.subscribe(challenges => {
		// 	console.debug('pesho', challenges);
		// 	this.challenges = Object.assign([], challenges);
		// 	this.changeDetector.detectChanges();
		// }));
	}

	createChallenge() {
		const lobbyEvent: ILobbyEvent = {
			type: LobbyEvents.createChallenge,
			payload: {
				userId: this.authService.profilePaylaod.sub,
				pieces: 'black',
			}
		}
		this.lobbyWebSocketService.emitEvent(lobbyEvent);
	}

	ngOnDestroy() {
		// this.subscriptions.forEach(s => {
		// 	if (s) {
		// 		s.unsubscribe();
		// 	}
		// })
	}
}
