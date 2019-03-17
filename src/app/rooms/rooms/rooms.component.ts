import { Component, OnInit } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-rooms',
	templateUrl: './rooms.component.html',
	styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, CanActivate {
	path: import("@angular/router").ActivatedRouteSnapshot[];
	route: import("@angular/router").ActivatedRouteSnapshot;

	constructor(private auth: AuthService) { }

	ngOnInit() {
	}

}
