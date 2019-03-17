import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
	declarations: [
		CallbackComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		CallbackComponent
	]
})
export class CallbackModule { }
