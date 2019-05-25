import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback/callback.component';
import { HomeComponent } from './home/home/home.component';
import { routesConstants } from 'src/routes';
import { LobbySceneComponent } from './lobby-scene/lobby-scene/lobby-scene.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GameSceneComponent } from './game/game-scene/game-scene.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: routesConstants.lobby, component: LobbySceneComponent, canActivate: [AuthGuard] },
	{ path: `${routesConstants.games}/:id`, component: GameSceneComponent, canActivate: [AuthGuard] },
	{ path: routesConstants.callback, component: CallbackComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
