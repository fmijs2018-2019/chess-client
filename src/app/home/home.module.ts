import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		FontAwesomeModule
	],
	exports: [
		HomeComponent
	]
})
export class HomeModule { }
