import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import axios, { AxiosAdapter } from 'axios';
import { IEvent } from '../interfaces/events/IEvent';

@Injectable({
	providedIn: 'root',
})
export class WebsocketService {
	private socket: SocketIOClient.Socket;
	connected: boolean = false;

	constructor() { }

	connect(): Subject<IEvent> {
		if (!this.connected) {
			this.socket = io('http://localhost:8080');
			this.connected = true;
		}

		const observable = new Observable(ob => {

			this.socket.on('event', (event: IEvent) => {
				console.log('Received event from Websocket Server');
				ob.next(event);
			});

			return () => {
				this.socket.disconnect();
			};
		});

		const observer = {
			next: (event: IEvent) => {
				this.socket.emit('event', event);
			},
		};

		return Subject.create(observer, observable);
	}

	joinMatch = (match: string) => {
		const config = { params: { match: match } }
		axios.get('/match/join', config);
	}
}
