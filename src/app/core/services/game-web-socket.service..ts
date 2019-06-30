import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { IGameEvent } from 'src/app/models/events/IGameEvent';
import { environment } from 'src/environments/environment';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { IMessageEvent } from 'src/app/models/api/IMessageEvent';
import { EventType } from './chess.service';
import { IMatch } from 'src/app/models/api/IMatch';
import { IMatchMoves } from 'src/app/models/api/IMatchMoves';
import { IMatchMessages } from 'src/app/models/api/IMatchMessages';

export enum GameEvents {
	joinGame = 'joinGame',
	makeMove = 'makeMove',
	onMove = 'onMove',
	sendMesssage = 'sendMessage',
	onMessage = 'onMessage',
	onTimeExpired = 'onTimeExpired',
}

interface IGameSocketIoOptions {
	onMove?: (move: IMoveEvent) => void;
	onMessage?: (message: IMessageEvent) => void;
}

@Injectable()
export class GameWebSocketService {

	private socket;
	private apiBaseUrl = `${environment.apiUrl}:${environment.apiPort}`;

	emitMessage = (matchId: string, message: IMessageEvent) => {
		if (this.socket) {
			this.socket.emit(GameEvents.sendMesssage, matchId, message);
		}
	}

	emitTimeExpired = (matchId: string, color: 'w' | 'b') => {
		if (this.socket) {
			this.socket.emit(GameEvents.onTimeExpired, matchId, color);
		}
	}

	emitJoinGame = (matchId: string, fn?: (match: IMatch, moves: IMatchMoves, messages: IMatchMessages) => void) => {
		if (this.socket) {
			this.socket.emit(GameEvents.joinGame, matchId, fn);
		}
	}

	emitMove = (matchId: string, move: IMoveEvent) => {
		if (this.socket) {
			this.socket.emit(GameEvents.makeMove, matchId, move);
		}
	}

	connect = (options: IGameSocketIoOptions) => {
		this.socket = io(this.apiBaseUrl + '/game');

		this.socket.on(GameEvents.onMove, (move: IMoveEvent) => {
			if (options.onMove) {
				options.onMove(move);
			}
		});

		this.socket.on(GameEvents.onMessage, (message: IMessageEvent) => {
			if (options.onMessage) {
				options.onMessage(message);
			}
		})
	}
}