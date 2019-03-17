import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


	constructor(private _authService: AuthService, private _router: Router) {
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this._authService.isAuthenticated()) {
			return true;
		}

		return this._authService.silentAuth()
			.then(() => {
				return Promise.resolve<boolean>(true)
			})
			.catch(() => {
				this._authService.login();
				return Promise.reject<boolean>(false);
			});
	}

}
