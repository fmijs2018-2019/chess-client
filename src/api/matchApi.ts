import httpClient from "./httpClient";

class MatchApi {
	getAll() {
		return httpClient.get('http://localhost:8080/matches');
	};

	getOpen() {
		return httpClient.get('http://localhost:8080/matches/open');
	};

	joinMatch(matchId: string) {
		
	}
}