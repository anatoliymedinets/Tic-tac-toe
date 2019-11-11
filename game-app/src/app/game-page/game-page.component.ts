import { Component, HostListener } from '@angular/core';

import { GameService } from '../common/services/game.service';
import { enGameState } from '../common/enums';

@Component({
  selector: 'app-game-page',
  templateUrl: 'game-page.component.html',
  host: {'window:beforeunload':'saveGameSession'}
})
export class GamePageComponent{

  @HostListener('window:beforeunload')
  saveGameSession() {
    if(this.gameService.gameState === enGameState.Play)
    localStorage.setItem('gameSession', JSON.stringify(this.gameService.gameSession))
  }

  constructor(private gameService: GameService) { }

  authenticate({firstPlayer, secondPlayer}){
    this.gameService.gameState = enGameState.Play
    this.gameService.gameSession = {firstPlayer, secondPlayer, cells: this.gameService.cells, steps: 0, state: enGameState.Play}
  }
}
