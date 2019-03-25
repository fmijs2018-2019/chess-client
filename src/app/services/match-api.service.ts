import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMatchCreateDto } from '../models/match/matchCreateDto';
import { IApiResult } from '../models/api/apiResult';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MatchApiService {
	baseUrl = environment.apiUrl + ':' + environment.apiPort + '/matches';
	constructor(private httpClient: HttpClient) { }

	createMatch = (match: IMatchCreateDto) => {
		return this.httpClient.post<IApiResult<any>>(this.baseUrl + '/create', match);
	};
}
