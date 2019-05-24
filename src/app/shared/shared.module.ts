import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { ObjKeysPipe } from './obj-keys.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		LayoutComponent,
		ObjKeysPipe,
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		RouterModule,
	],
	exports: [
		LayoutComponent,
		ObjKeysPipe,
	]
})
export class SharedModule { }
