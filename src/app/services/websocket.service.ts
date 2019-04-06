import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEventBase } from '../models/events/eventBase';
import { EventType } from '../models/events/eventTypes';
import { IMessageEvent } from '../models/events/message';
import { IMoveEvent } from '../models/events/move';
import { IJoinEvent } from '../models/events/join';

@Injectable({
	providedIn: 'root',
})
export class WebsocketService {
	private socket: SocketIOClient.Socket;
	private apiBaseUrl = `${environment.apiUrl}:${environment.apiPort}`;
	events: Subject<IEventBase>;

	constructor() {
		this.socket = io(this.apiBaseUrl);

		const observable = new Observable(ob => {
			this.socket.on('message', (event: IMessageEvent) => {
				console.log(event.message);
				ob.next(event);
			});

			this.socket.on('move', (event: IMoveEvent) => {
				ob.next(event);
			});

			this.socket.on('joinMatch', (event: IJoinEvent) => {
				console.log(event.sender + ' joined');
				ob.next(event);
			})

			return () => {
				this.socket.disconnect();
			};
		});

		const observer = {
			next: (event: IEventBase) => {
				this.socket.emit(event.type, event);
			},
		};

		this.events = Subject.create(observer, observable);
	}
}
