import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IEvent } from '../interfaces/events/IEvent';
import { WebsocketService } from './websocket.service';
import { ChatEvent, IChatEvent } from '../interfaces/events/IChatEvent';

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
		const messageEvant: IChatEvent = new ChatEvent('123', room, 'pesho', msg)
		this.messages.next(messageEvant);
	}

}
