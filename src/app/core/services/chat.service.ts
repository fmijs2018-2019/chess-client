// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { IMessageEvent } from '../../models/events/message';
// import { EventType } from '../../models/events/eventTypes';
// import { AuthService } from './auth.service';
// import { WebsocketService } from './websocket.service';

// @Injectable({
// 	providedIn: 'root',
// })
// export class ChatService {
// 	messages: Subject<IMessageEvent>;

// 	constructor(private wsService: WebsocketService, private authService: AuthService) {
// 	}

// 	sendMsg(room: string, msg: any) {
// 		const messageEvant: IMessageEvent = {
// 			room,
// 			sender: this.authService.profilePaylaod.sub,
// 			message: msg,
// 			type: EventType.message
// 		};

// 		this.messages.next(messageEvant);
// 	}

// }
