import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback/callback.component';
import { HomeComponent } from './home/home/home.component';
import { routesConstants } from 'src/routes';
import { LobbySceneComponent } from './lobby-scene/lobby-scene/lobby-scene.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GameSceneComponent } from './game/game-scene/game-scene.component';
import { MatchesSceneComponent } from './matches/matches-scene/matches-scene.component';
import { MatchSceneComponent } from './matches/match-scene/match-scene.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: routesConstants.lobby, component: LobbySceneComponent, canActivate: [AuthGuard] },
	{ path: `${routesConstants.games}/:id`, component: GameSceneComponent, canActivate: [AuthGuard] },
	{ path: routesConstants.callback, component: CallbackComponent },
	{ path: routesConstants.matchesHistory, component: MatchesSceneComponent, canActivate: [AuthGuard] },
	{ path: `${routesConstants.matchesHistory}/:id`, component: MatchSceneComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
