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

	// Our socket connection
	private socket;

	// private challenges: Observable<IChallenge[]>;
	private challenges: IChallenge[];
	private apiBaseUrl = `${environment.apiUrl}:${environment.apiPort}`;

	constructor(private router: Router, private authService: AuthService) { }

	getChallenges = () => {
		return this.challenges;
	}

	emitEvent = (event: ILobbyEvent) => {
		this.socket.emit(event.type, event.payload);
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
			this.router.navigateByUrl(`/games/${matchId}`);
			console.log('onChallengeApprove', this.challenges);
		});

		this.socket.on(LobbyEvents.onChallengeRemove, (challengeIds: string[]) => {
			arrayRemoveWhile(this.challenges, (ch, ind) => challengeIds.indexOf(ch.id) !== -1);
			console.log('onChallengeRemove', this.challenges);
		});
	}

	// connect(): Subject<any> {

	// 	this.socket = io(this.apiBaseUrl + '/lobby');

	// 	// We define our observable which will observe any incoming messages
	// 	// from our socket.io server.
	// 	let observable = new Observable(observer => {
	// 		this.socket.on(LobbyEvents.getChallenges, (challenges: IChallenge[]) => {
	// 			console.debug('getchallenges', challenges);
	// 			this.challenges = from(challenges).pipe(
	// 				scan((acc, v: IChallenge) => acc.concat(v), [] as IChallenge[])
	// 			);
	// 			observer.next(challenges);
	// 		});
	// 		this.socket.on(LobbyEvents.onChallengeCreate, (challenge: IChallenge) => {
	// 			console.debug('challengecreate', challenge)
	// 			this.challenges.pipe(
	// 				map(challenges => {
	// 					challenges.push(challenge);
	// 				})
	// 			);
	// 			observer.next(this.challenges);
	// 		});
	// 		this.socket.on(LobbyEvents.onChallengeApprove, (matchId: string) => {
	// 			// const challengeIndex = this.challenges.findIndex(c => c.id === challengeId);
	// 			// this.challenges.splice(challengeIndex);
	// 			console.log('challengeapprove', matchId);
	// 			this.router.navigateByUrl(`/games/${matchId}`);
	// 			observer.next(this.challenges);
	// 		});
	// 		this.socket.on(LobbyEvents.onChallengeRemove, (challengeIds: string[]) => {
	// 			console.log('challengesremove', challengeIds)
	// 			this.challenges.pipe(
	// 				map(challenges => {
	// 					challenges.filter(c => challengeIds.indexOf(c.id) === -1)
	// 				})
	// 			);
	// 			observer.next(this.challenges);
	// 		});
	// 		return () => {
	// 			this.socket.disconnect();
	// 		}
	// 	});

	// 	// We define our Observer which will listen to messages
	// 	// from our other components and send messages back to our
	// 	// socket server whenever the `next()` method is called.
	// 	let observer = {
	// 		next: (event: ILobbyEvent) => {
	// 			this.socket.emit(event.type, event.payload);
	// 		},
	// 	};

	// 	// we return our Rx.Subject which is a combination
	// 	// of both an observer and observable.
	// 	return Subject.create(observer, observable);
	// }

}