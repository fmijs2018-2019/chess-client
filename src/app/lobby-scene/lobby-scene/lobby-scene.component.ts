import { Component, OnInit, OnDestroy } from '@angular/core';
import { IChallenge } from 'src/app/models/IChallenge';
import { LobbyWebSocketService, LobbyEvents } from '../../core/services/lobby-web-socket.service';
import { ILobbyEvent } from 'src/app/models/events/ILobbyEvent';
import { AuthService } from 'src/app/core/services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateChallengeModalComponent } from '../create-challenge-modal/create-challenge-modal.component';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-lobby-scene',
	templateUrl: './lobby-scene.component.html',
	styleUrls: ['./lobby-scene.component.css']
})
export class LobbySceneComponent implements OnInit, OnDestroy {

	modalRef: BsModalRef;

	challenges: IChallenge[];
	myChallenge: IChallenge;

	constructor(private lobbyWebSocketService: LobbyWebSocketService,
		private authService: AuthService,
		private modalService: BsModalService) { }

	ngOnInit() {
		this.lobbyWebSocketService.connect()
		this.challenges = this.lobbyWebSocketService.getChallenges();
	}

	createChallenge(settings: { piecesColor: 'white' | 'black', time: number | null }) {
		const userId = this.authService.profilePaylaod.sub;
		const pieces = settings.piecesColor;

		this.lobbyWebSocketService.emitCreateChallenge(pieces, userId, settings.time, (ch: IChallenge) => this.myChallenge = ch);
	}

	clickRow(id: string) {
		const isMyChallenge = this.myChallenge && this.myChallenge.id === id;

		if (isMyChallenge) {
			this.myChallenge = undefined;
			this.lobbyWebSocketService.emitRemoveChallenge(id);
		} else {
			const userId = this.authService.profilePaylaod.sub;
			this.lobbyWebSocketService.emitApproveChallenge(id, userId);
		}
	}

	openModal() {
		this.modalRef = this.modalService.show(CreateChallengeModalComponent);
		console.log(this.modalRef.content);
		this.modalRef.content.action.pipe(take(1)).subscribe((value) => {
			this.createChallenge(value);
			this.modalRef.hide();
		});
	}

	ngOnDestroy() {	}
}
