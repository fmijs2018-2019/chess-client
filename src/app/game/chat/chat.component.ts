import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMessageEvent } from 'src/app/models/api/IMessageEvent';
import { AuthService } from 'src/app/core/services/auth.service';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	@Input()
	messages: IMessageEvent[];

	@Input()
	moves: IMoveEvent[];

	constructor(private authService: AuthService) { }

	ngOnInit() {
	}

	text = '';

	@Output()
	sendMessage = new EventEmitter<string>();

	clickSend = () => {
		if (this.text !== '') {
			this.sendMessage.emit(this.text);
			this.text = '';
		}
	}

	checkIfMyMessage(senderId: string) {
		return senderId === this.authService.profilePaylaod.sub;
	}

}
