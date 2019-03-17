import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { routes } from 'src/routes';

@Component({
	selector: 'app-callback',
	templateUrl: './callback.component.html',
	styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) { }

	async ngOnInit() {
		try {
			await this.authService.handleAuthentication();
			await this.router.navigateByUrl(routes.rooms);
		} catch (err) {
			// TODO: handle err
		}
	}

}
