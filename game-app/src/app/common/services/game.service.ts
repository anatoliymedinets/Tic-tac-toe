import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable } from 'rxjs';

import { GameSession, Player, Cell, Game } from '../interfaces';
import { enGameState } from '../enums';

@Injectable({
    providedIn:'root'
})
export class GameService{

    gameResult$: Subject<Player> = new Subject<Player>();
    gameState: enGameState = enGameState.NotStarted

    public gameSession: GameSession

    cells: Cell[] = [
        {key: 0, value: ''},
        {key: 1, value: ''},
        {key: 2, value: ''},
        {key: 3, value: ''},
        {key: 4, value: ''},
        {key: 5, value: ''},
        {key: 6, value: ''},
        {key: 7, value: ''},
        {key: 8, value: ''}
    ]

    

    constructor(private http: HttpClient){
        if(localStorage.getItem('gameSession')){
            this.gameSession = JSON.parse(localStorage.getItem('gameSession'))
            this.cells = this.gameSession.cells;
            this.gameState = this.gameSession.state
        }
    }

    getCell(index: number): Cell{
        return this.cells[index]
    }

    enterCell(index: number){
        if(this.cells[index].value || this.gameSession.steps === 9)
            return

        const symbol = this.gameSession.steps % 2 === 0? 'x' : 'o'
        this.cells[index].value = symbol
        this.checkWinner(symbol)

        this.gameSession.steps++
        if(this.gameSession.steps === 9)
            this.gameResult$.next(this.getResult(null))

    }

    checkWinner(symbol){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (symbol === this.cells[a].value 
                && this.cells[a].value === this.cells[b].value 
                && this.cells[a].value === this.cells[c].value) {
                    this.gameResult$.next(this.getResult(symbol))
            }
          }
    }

    getResult(symbol: string): Player{
        this.gameState = enGameState.Stop
        localStorage.clear()

        if(symbol){
            return symbol === 'x' ? this.gameSession.firstPlayer : this.gameSession.secondPlayer
        }
        else
         return null
         
    }

    resetBoard(){
        this.cells.forEach(c => {
            c.value = ''
        })
        this.gameSession.steps = 0

        this.gameSession.state = this.gameState = enGameState.NotStarted

        localStorage.setItem('gameSession', JSON.stringify(this.gameSession))
    }

    pushGame(game: Game): Observable<Game>{
        return this.http.post<Game>('api/games', game)
    }

    getAll(): Observable<Game[]>{
        return this.http.get<Game[]>('api/games')
    }
}