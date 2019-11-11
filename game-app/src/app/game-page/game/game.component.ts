import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/common/services/game.service';
import { PlayerService } from 'src/app/common/services/player.service';
import { Player, Game } from 'src/app/common/interfaces';
import { combineLatest, Subscription } from 'rxjs';
//import { enGameState } from 'src/app/common/enums';

@Component({
  selector: 'app-game',
  template: `
  <app-score></app-score>
  <app-board></app-board>
  `
})
export class GameComponent implements OnInit, OnDestroy {

  // @HostListener('window:beforeunload')
  // saveGameSession() {
  //   if(this.gameService.gameState === enGameState.Play)
  //   localStorage.setItem('gameSession', JSON.stringify(this.gameService.gameSession))
  // }

  sub: Subscription
  subResult: Subscription

  constructor(private gameService: GameService,
              private playerService: PlayerService) { }

  ngOnInit() {
    this.sub = this.gameService.gameResult$.subscribe((winner: Player)=>{

      const {firstPlayer, secondPlayer} = this.gameService.gameSession

      if(winner){
        winner.id === firstPlayer.id ? firstPlayer.win++ : firstPlayer.lose++
        winner.id === secondPlayer.id ? secondPlayer.win++ : secondPlayer.lose++
      }else{
        firstPlayer.draw++
        secondPlayer.draw++
      }

      console.log(this.gameService.gameSession.steps)

      //переписать 
      const game: Game = {
        winnerId: winner? winner.id : null,
        date: new Date(Date.now()),
        steps: this.gameService.gameSession.steps,
        firstPlayerId: firstPlayer.id,
        secondPlayerId: secondPlayer.id
      }

      this.subResult = combineLatest(
        this.playerService.updateStats(firstPlayer),
        this.playerService.updateStats(secondPlayer),
        this.gameService.pushGame(game)
      ).subscribe(([firstPlayer, secondPlayer, game])=>{  })
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
    if(this.subResult)
      this.subResult.unsubscribe()
  }
}
