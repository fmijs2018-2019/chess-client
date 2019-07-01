import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { routesConstants } from 'src/routes';
import { environment } from 'src/environments/environment';
import { IProfilePayload } from '../../models/auth/IProfilePayload';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _idToken?: string;
	private _accessToken?: string;
	private _expiresAt?: number;
	private _idTokenPayload?: IProfilePayload;
	private _auth0?: auth0.WebAuth;

	constructor() {
		const options: auth0.AuthOptions = {
			domain: environment.auth0IdentityUrl,
			clientID: environment.auth0ClientId,
			responseType: 'token id_token',
			redirectUri: environment.url + ':' + environment.port + '/' + routesConstants.callback,
			scope: 'openid profile email'
		};

		this._auth0 = new auth0.WebAuth(options);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.setAuthResult = this.setAuthResult.bind(this);
		this.silentAuth = this.silentAuth.bind(this);
	}

	get profilePaylaod(): IProfilePayload {
		return this._idTokenPayload;
	}

	get accessToken(): string {
		return this._accessToken;
	}

	get idToken(): string {
		return this._idToken;
	}

	public login(authOptions?: auth0.AuthorizeOptions): void {
		this._auth0.authorize(authOptions);
	}

	public handleAuthentication(): Promise<auth0.Auth0DecodedHash> {
		return new Promise((resolve, reject) => {
			this._auth0.parseHash((err, authResult) => {
				if (err) {
					return reject(err)
				}
				if (!authResult || !authResult.idToken) {
					return reject('Handle authentication failed!');
				}
				this.setAuthResult(authResult);
				resolve(authResult);
			});
		});
	}

	private setAuthResult(authResult: auth0.Auth0DecodedHash): void {
		const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
		this._accessToken = authResult.accessToken;
		this._idToken = authResult.idToken;
		this._expiresAt = expiresAt;
		this._idTokenPayload = authResult.idTokenPayload;
	}

	public logout(): void {
		this._accessToken = undefined;
		this._expiresAt = undefined;
		this._idToken = undefined;
		this._idTokenPayload = undefined;
		this._auth0.logout({
			returnTo: environment.url + ':' + environment.port,
			clientID: environment.auth0ClientId
		})
	}

	public isAuthenticated(): boolean {
		return new Date().getTime() < this._expiresAt;
	}

	public silentAuth(): Promise<auth0.Auth0DecodedHash> {
		return new Promise((resolve, reject) => {
			this._auth0.checkSession({}, (err, authResult) => {
				if (err) {
					return reject(err);
				}
				this.setAuthResult(authResult);
				resolve(authResult);
			});
		});
	}

}
