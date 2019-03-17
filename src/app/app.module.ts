import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { MatchModule } from './match/match.module';
import { RoomsModule } from './rooms/rooms.module';
import { CallbackComponent } from './callback/callback/callback.component';
import { CallbackModule } from './callback/callback.module';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatchModule,
		SharedModule,
		RoomsModule,
		CallbackModule
	],
	providers: [
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
