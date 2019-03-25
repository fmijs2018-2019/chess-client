import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { IEvent, EventType } from '../models/event/event';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	messages: Subject<IEvent>;

	constructor(private wsService: WebsocketService) {
		this.messages = wsService
			.connect();
	}

	sendMsg(room: string, msg: any) {
		const messageEvant: IEvent = {
			room,
			type: EventType.Message,
			payload: { sender: 'pesho', message: msg }
		};
		
		this.messages.next(messageEvant);
	}

}
