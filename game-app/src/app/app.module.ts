import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageComponent } from './game-page/game-page.component';
import { AuthComponent } from './game-page/auth/auth.component';
import { GameComponent } from './game-page/game/game.component';
import { StatsPageComponent } from './stats-page/stats-page.component';
import { ScoreComponent } from './game-page/game/score/score.component';
import { BoardComponent } from './game-page/game/board/board.component';
import { CellComponent } from './game-page/game/board/cell/cell.component';
import { GameLayoutComponent } from './common/layouts/game-layout/game-layout.component';
import { PlayersComponent } from './stats-page/players/players.component';
import { GamesComponent } from './stats-page/games/games.component';
import { LoaderComponent } from './common/components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    AuthComponent,
    GameComponent,
    StatsPageComponent,
    ScoreComponent,
    BoardComponent,
    CellComponent,
    GameLayoutComponent,
    PlayersComponent,
    GamesComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
