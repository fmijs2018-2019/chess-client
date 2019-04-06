import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { ObjKeysPipe } from './obj-keys.pipe';

@NgModule({
	declarations: [
		LayoutComponent,
		ObjKeysPipe,
	],
	imports: [
		CommonModule
	],
	exports: [
		LayoutComponent,
		ObjKeysPipe
	]
})
export class SharedModule { }
