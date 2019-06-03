import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from 'src/app/models/api/IMessage';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	// @Input()
	messages: any = [
		{ sender: 'petq', message: 'hi' },
		{ sender: 'petq', message: 'hi' },
		{ sender: 'petq', message: 'Set the word delimiter by typeaheadPhraseDelimiters to match exact phrase.' },
		{ sender: 'petq', message: 'This is demo with delimeters "&" and ","' },
		{ sender: 'petq', message: 'hi' },
	];

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.messages[2].sender = this.authService.profilePaylaod.sub;
	}

	sendMessage() {

	}

	checkIfMyMessage(senderId: string) {
		return senderId === this.authService.profilePaylaod.sub;
	}

}
