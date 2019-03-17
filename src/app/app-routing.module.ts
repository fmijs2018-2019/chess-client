import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChessComponent } from './match/chess/chess.component';
import { AuthGuard } from './services/auth-guard.service';
import { ChatComponent } from './match/chat/chat.component';
import { RoomsComponent } from './rooms/rooms/rooms.component';
import { CallbackComponent } from './callback/callback/callback.component';

const routes: Routes = [
	{ path: '', component: ChatComponent, pathMatch: 'full' },
	// { path: 'matches', component: ChessComponent },
	{ path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
	{ path: 'callback', component: CallbackComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
