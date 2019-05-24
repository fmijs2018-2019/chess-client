import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IMatchCreateDto } from '../../models/match/matchCreateDto';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class MatchApiService {
	private baseUrl = environment.apiUrl + ':' + environment.apiPort + '/matches';
	private headers = new HttpHeaders().append('Authorization', `Bearer ${this.authService.idToken}`);

	constructor(private httpClient: HttpClient, private authService: AuthService) {
	}

	createMatch = (match: IMatchCreateDto) => {
		// return this.httpClient.post<IApiResult<any>>(this.baseUrl + '/create', match, { headers: this.headers });
	};

	joinMatch = (matchId: string) => {
		// return this.httpClient.post<IApiResult<any>>(`${this.baseUrl}/${matchId}/join`, {}, { headers: this.headers });
	};

	getAllMatches = () => {
		// return this.httpClient.get<IApiResult<any>>(this.baseUrl, { headers: this.headers });
	}
}
