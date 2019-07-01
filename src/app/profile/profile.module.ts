import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSceneComponent } from './profile-scene/profile-scene.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [ProfileSceneComponent],
	imports: [
		CommonModule,
		FontAwesomeModule,
	]
})
export class ProfileModule { }
