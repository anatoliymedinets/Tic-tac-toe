import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/common/services/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

}
