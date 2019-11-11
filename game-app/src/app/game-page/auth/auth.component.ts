import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';

import { PlayerService } from 'src/app/common/services/player.service';
import { Player } from 'src/app/common/interfaces';
import { GameService } from 'src/app/common/services/game.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  @Output() onAuth = new EventEmitter<{firstPlayer:Player, secondPlayer: Player}>();

  form: FormGroup
  sub: Subscription

  constructor(private playerService: PlayerService,
              private gameService: GameService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstPlayerName: new FormControl(null, [Validators.required, Validators.minLength(3), this.uniquePlayerName.bind(this)]),
      secondPlayerName: new FormControl(null, [Validators.required, Validators.minLength(3), this.uniquePlayerName.bind(this)])
    })

    if(this.gameService.gameSession){
      const { firstPlayer: { name : firstPlayerName} , secondPlayer: { name : secondPlayerName}} = this.gameService.gameSession
      this.form.patchValue({firstPlayerName, secondPlayerName})
    }
  }

  uniquePlayerName(control: FormControl) : {[key: string] : boolean} {

    if(control.parent && control.parent.controls['firstPlayerName'] === control)
    {
      if(control.value !==null && control.value === this.form.value.secondPlayerName)
      return { equal: true}
    }
    if(control.parent && control.parent.controls['secondPlayerName'] === control)
    {
      if(control.value !==null && control.value === this.form.value.firstPlayerName)
      return { equal: true}
    }
    return null
  }

  onSubmit(){
    const { firstPlayerName, secondPlayerName} = this.form.value
    let firstPlayer: Player =  { name: firstPlayerName }
    let secondPlayer: Player =  { name: secondPlayerName }

    //Получить / Добавить играков
    this.sub = combineLatest(
      this.playerService.approvePlayer(firstPlayer),
      this.playerService.approvePlayer(secondPlayer),
    ).subscribe(([fPlayer, sPlayer]) =>{
      firstPlayer = fPlayer
      secondPlayer = sPlayer

      this.onAuth.emit({firstPlayer, secondPlayer})
    })
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe()
    }
  }
}
