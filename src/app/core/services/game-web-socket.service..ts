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
	makeMove = 'makeMove',
	onMove = 'onMove',
	sendMesssage = 'sendMessage',
	onMessage = 'onMessage',
}

@Injectable()
export class GameWebSocketService {

	private socket;

	private apiBaseUrl = `${environment.apiUrl}:${environment.apiPort}`;

	emitEvent = (event: IGameEvent, callback?: any) => {
		this.socket.emit(event.type, event.payload, callback);
	}

	connect = (onMove: any, onMessage: any) => {
		this.socket = io(this.apiBaseUrl + '/game');

		this.socket.on(GameEvents.onMove, (move) => {
			console.log("some move", move);
			onMove(move);
		});

		this.socket.on(GameEvents.onMessage, (message) => {
			console.log('some message', message);
			onMessage(message);
		})
	}
}