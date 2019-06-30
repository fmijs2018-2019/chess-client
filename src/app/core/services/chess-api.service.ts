import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMove } from 'src/app/models/api/IMove';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class ChessApiService {
	private headers: HttpHeaders;

	constructor(private httpClient: HttpClient, private authService: AuthService) {
		this.headers = new HttpHeaders({
			authorization: 'Bearer ' + this.authService.idToken
		});
	}

	getMatch(matchId: string) {

	}

	getMoves(matchId: string): Observable<IMove[]> {
		console.log(this.headers);
		return this.httpClient.get(`http://localhost:8080/matches/${matchId}/moves`, { headers: this.headers }) as Observable<IMove[]>;
	}
}
