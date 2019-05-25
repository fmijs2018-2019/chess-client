import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { IChallenge } from 'src/app/models/IChallenge';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, Subject, from } from 'rxjs';
import { ILobbyEvent } from 'src/app/models/events/ILobbyEvent';
import { scan, map, filter } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IGameEvent } from 'src/app/models/events/IGameEvent';

export enum GameEvents {
	joinGame = 'joinGame',
	onGameJoin = 'onGameJoin'
}

@Injectable()
export class GameWebSocketService {

	private socket;

	private apiBaseUrl = `${environment.apiUrl}:${environment.apiPort}`;

	constructor(private router: Router, private authService: AuthService) { }

	

	emitEvent = (event: IGameEvent, callback?: any) => {
		this.socket.emit(event.type, event.payload, callback);
	}

	connect = () => {
		this.socket = io(this.apiBaseUrl + '/game');

		this.socket.on(GameEvents.onGameJoin, (match: any) => {
			
		});
	}
}