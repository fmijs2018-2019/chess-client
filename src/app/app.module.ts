import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { CallbackModule } from './callback/callback.module';
import { AuthGuard } from './services/auth-guard.service';
import { LiveMatchModule } from './live-match/live-match.module';
import { LiveMatchesListModule } from './live-matches/live-matches-list.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		SharedModule,
		LiveMatchesListModule,
		CallbackModule,
		HomeModule,
		LiveMatchModule
	],
	providers: [
		AuthGuard,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
