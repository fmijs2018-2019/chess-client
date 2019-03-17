import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { IEvent } from 'src/app/interfaces/events/IEvent';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
	messageEvents: IEvent[] = [];
	connection: Subscription;
	@Input()
	room: string;

	constructor(private chat: ChatService) {
	}

	ngOnInit() {
		this.chat.messages.subscribe(ev => {
			ev.type == 'message' && this.messageEvents.push(ev);
		});
	}

	sendMessage(message: string) {
		if (message !== '' && this.room) {
			this.chat.sendMsg(this.room, message);
		}
	}

	ngOnDestroy(): void {
		this.connection.unsubscribe();
	}

}
