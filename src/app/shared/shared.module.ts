import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { ObjKeysPipe } from './obj-keys.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [
		LayoutComponent,
		ObjKeysPipe,
	],
	imports: [
		CommonModule,
		FontAwesomeModule
	],
	exports: [
		LayoutComponent,
		ObjKeysPipe,
	]
})
export class SharedModule { }
