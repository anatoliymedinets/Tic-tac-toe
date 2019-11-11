import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game } from 'src/app/common/interfaces';
import { GameService } from 'src/app/common/services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games$: Observable<Game[]>

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.games$ = this.gameService.getAll().pipe(
      map((data: Game[])=> {
        const games = data

        data.forEach(g=>{
          if(g.winnerId){
            g.winnerId = g.winnerId === g.firstPlayerId? g.firstPlayer.name : g.secondPlayer.name  
          }
        })
        return data
      })
    )
  }

}
