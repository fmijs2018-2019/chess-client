import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMoveEvent } from 'src/app/models/api/IMoveEvent';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { IMatch } from 'src/app/models/api/IMatch';
import { IUserStatistics } from 'src/app/models/api/IUserStatistics';

@Injectable({
	providedIn: 'root'
})
export class ChessApiService {
	private headers: HttpHeaders;
	private baseApiUrl: string;

	constructor(private httpClient: HttpClient, private authService: AuthService) {
		this.headers = new HttpHeaders({
			authorization: 'Bearer ' + this.authService.idToken
		});

		this.baseApiUrl = `${environment.apiUrl}:${environment.apiPort}`;
	}

	getMatch(matchId: string) {
		return this.httpClient.get(`${this.baseApiUrl}/matches/${matchId}`, { headers: this.headers }) as Observable<IMatch>;
	}

	getAllMatches() {
		return this.httpClient.get(`${this.baseApiUrl}/matches`, { headers: this.headers }) as Observable<IMatch[]>;
	}

	getMoves(matchId: string): Observable<IMoveEvent[]> {
		return this.httpClient.get(`${this.baseApiUrl}/matches/${matchId}/moves`, { headers: this.headers }) as Observable<IMoveEvent[]>;
	}

	getStatistics(): Observable<IUserStatistics> {
		return this.httpClient.get(`${this.baseApiUrl}/statistics`, { headers: this.headers }) as Observable<IUserStatistics>;
	}
}
