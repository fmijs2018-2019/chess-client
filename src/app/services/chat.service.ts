import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { IMessageEvent } from '../models/events/message';
import { IEventBase } from '../models/events/eventBase';
import { AuthService } from './auth.service';
import { EventType } from '../models/events/eventTypes';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	messages: Subject<IMessageEvent>;

	constructor(private wsService: WebsocketService, private authService: AuthService) {
	}

	sendMsg(room: string, msg: any) {
		const messageEvant: IMessageEvent = {
			room,
			sender: this.authService.profilePaylaod.sub,
			message: msg,
			type: EventType.message
		};

		this.messages.next(messageEvant);
	}

}
