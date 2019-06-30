import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IProfilePayload } from 'src/app/models/auth/IProfilePayload';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { ChessApiService } from 'src/app/core/services/chess-api.service';
import { IUserStatistics } from 'src/app/models/api/IUserStatistics';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-profile-scene',
	templateUrl: './profile-scene.component.html',
	styleUrls: ['./profile-scene.component.css']
})
export class ProfileSceneComponent implements OnInit {
	public faUserSecret = faUserSecret;

	public profilePayload: IProfilePayload;
	public userStatistics$: Observable<IUserStatistics>;
	public statisticsLoaded = false;

	constructor(private authService: AuthService, private chessApiService: ChessApiService) { }

	ngOnInit() {
		this.profilePayload = this.authService.profilePaylaod;
		this.userStatistics$ = this.chessApiService.getStatistics();
	}

}
