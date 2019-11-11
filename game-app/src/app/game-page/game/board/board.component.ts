import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/common/services/game.service';
import { Cell } from 'src/app/common/interfaces';
import {enGameState} from 'src/app/common/enums'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cells: Cell[] = []

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.cells = this.gameService.cells
  }

  cellPress(cell:Cell){
    if(this.gameService.gameState == enGameState.Stop)
      return
    this.gameService.enterCell(cell.key)
  }

  reset(){
    this.gameService.resetBoard()
  }
}
