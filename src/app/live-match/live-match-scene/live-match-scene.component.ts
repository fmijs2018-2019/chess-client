import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchApiService } from 'src/app/services/match-api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';
import { IJoinEvent } from 'src/app/models/events/join';
import { EventType } from 'src/app/models/events/eventTypes';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-live-match-scene',
	templateUrl: './live-match-scene.component.html',
	styleUrls: ['./live-match-scene.component.css']
})
export class LiveMatchSceneComponent implements OnInit, OnDestroy {
	matchId: string;
	orientation: 'white' | 'black';
	fen: string;
	subscription: Subscription;

	constructor(private webSocketService: WebsocketService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.matchId = params['id'];
		});

		this.activatedRoute.queryParams.subscribe(queryParams => {
			this.orientation = queryParams['orientation'];
			this.fen = queryParams['fen'];
		})

		const joinEvent: IJoinEvent = {
			room: this.matchId,
			sender: this.authService.profilePaylaod.sub,
			type: EventType.joinMatch
		}
		this.webSocketService.events.next(joinEvent);
	}

	ngOnDestroy() {
		this.subscription && this.subscription.unsubscribe();
	}
}
