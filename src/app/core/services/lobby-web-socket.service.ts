import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { IChallenge } from 'src/app/models/IChallenge';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, Subject, from } from 'rxjs';
import { ILobbyEvent } from 'src/app/models/events/ILobbyEvent';
import { scan, map, filter } from 'rxjs/operators';
import { AuthService } from './auth.service';

export enum LobbyEvents {
	getChallenges = 'getChallenges',

	createChallenge = 'createChallenge',
	removeChallenge = 'removeChallenge',
	approveChallenge = 'approveChallenge',

	onChallengeCreate = 'onChallengeCreate',
	onChallengeRemove = 'onChallengeRemove',
	onChallengeApprove = 'onChallengeApprove',
}

export const arrayRemoveWhile = <T>(arr: T[], callback: (v: T, ind: number) => boolean) => {
	var i = arr.length;
	while (i--) {
		if (callback(arr[i], i)) {
			arr.splice(i, 1);
		}
	}
};

@Injectable()
export class LobbyWebSocketService {

	private socket;

	private challenges: IChallenge[];
	private apiBaseUrl = `${environment.apiUrl}:${environment.apiPort}`;

	constructor(private router: Router, private authService: AuthService) { }

	getChallenges = () => {
		return this.challenges;
	}

	emitEvent = (event: ILobbyEvent, callback?: any) => {
		this.socket.emit(event.type, event.payload, callback);
	}

	connect = () => {
		this.challenges = [];
		this.socket = io(this.apiBaseUrl + '/lobby');

		this.socket.on(LobbyEvents.getChallenges, (challenges: IChallenge[]) => {
			var userId = this.authService.profilePaylaod && this.authService.profilePaylaod.sub;
			challenges
				.filter(ch => ch.sub !== userId)
				.forEach(ch => {
					this.challenges.push(ch);
				});
			console.log('getChallenges', this.challenges);
		});

		this.socket.on(LobbyEvents.onChallengeCreate, (challenge: IChallenge) => {
			this.challenges.push(challenge);
			console.log('onChallengeCreate', this.challenges);
		});

		this.socket.on(LobbyEvents.onChallengeApprove, (matchId: string) => {
			this.router.navigate(['/games', matchId]);
			console.log('onChallengeApprove', this.challenges);
		});

		this.socket.on(LobbyEvents.onChallengeRemove, (challengeIds: string[]) => {
			arrayRemoveWhile(this.challenges, (ch, ind) => challengeIds.indexOf(ch.id) !== -1);
			console.log('onChallengeRemove', this.challenges);
		});
	}
}