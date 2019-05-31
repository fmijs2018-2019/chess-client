import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { CallbackModule } from './callback/callback.module';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CoreModule } from './core/core.module';
import { LobbySceneModule } from './lobby-scene/lobby-scene.module';
import { GameModule } from './game/game.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		SharedModule,
		CallbackModule,
		HomeModule,
		CoreModule,
		LobbySceneModule,
		GameModule,
		BsDropdownModule.forRoot(),
		ModalModule.forRoot()
	],
	providers: [
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
