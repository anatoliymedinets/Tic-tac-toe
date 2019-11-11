import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamePageComponent } from './game-page/game-page.component';
import { StatsPageComponent } from './stats-page/stats-page.component';

const routes: Routes = [
  {path: 'game', component: GamePageComponent},
  {path: 'stats', component: StatsPageComponent},
  {path: '**', redirectTo:'game'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
