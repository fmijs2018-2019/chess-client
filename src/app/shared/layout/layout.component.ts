import { Component, OnInit } from '@angular/core';
import { faChess } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

	faChess = faChess;
	dropdown: string;

	constructor(public auth: AuthService) { }

	ngOnInit() {
	}

	toggleDropdown() {
		if(this.dropdown) {
			this.dropdown = undefined;
		} else {
			this.dropdown = 'show';
		}
	}

}
