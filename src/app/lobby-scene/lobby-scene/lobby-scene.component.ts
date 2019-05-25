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
	myChallenge;

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
		this.myChallenge = {
			userId: this.authService.profilePaylaod.sub,
			pieces: 'black',
		};

		const lobbyEvent: ILobbyEvent = {
			type: LobbyEvents.createChallenge,
			payload: this.myChallenge
		}
		this.lobbyWebSocketService.emitEvent(lobbyEvent);
	}

	clickRow(id: string) {
		console.log('scene', id);
		const isMyChallenge = this.myChallenge && this.myChallenge.id === id;

		const lobbyEvent: ILobbyEvent = {
			type: isMyChallenge ? LobbyEvents.removeChallenge : LobbyEvents.approveChallenge,
			payload: id
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
