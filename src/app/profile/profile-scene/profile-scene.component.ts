import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IProfilePayload } from 'src/app/models/auth/IProfilePayload';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-profile-scene',
	templateUrl: './profile-scene.component.html',
	styleUrls: ['./profile-scene.component.css']
})
export class ProfileSceneComponent implements OnInit {
	public faUserSecret = faUserSecret;

	public profilePayload: IProfilePayload;
	public userStatistics = {
		totalGamesCount: 12,
		totalWins: 7,
		totalLoses: 5,
		totalStalemate: 0,
		totalGamesAsWhite: 4,
		totalGamesAsBlack: 8,
	}

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.profilePayload = this.authService.profilePaylaod;
	}

}
