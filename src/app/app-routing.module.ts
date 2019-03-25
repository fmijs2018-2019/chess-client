import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { CallbackComponent } from './callback/callback/callback.component';
import { HomeComponent } from './home/home/home.component';
import { routesConstants } from 'src/routes';
import { LiveMatchSceneComponent } from './live-match/live-match-scene/live-match-scene.component';
import { LiveMatchesSceneComponent } from './live-matches/live-matches-scene/live-matches-scene.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: routesConstants.liveMatches, component: LiveMatchesSceneComponent, canActivate: [AuthGuard] },
	{ path: `${routesConstants.liveMatches}/:id`, component: LiveMatchSceneComponent, canActivate: [AuthGuard] },
	{ path: routesConstants.callback, component: CallbackComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
