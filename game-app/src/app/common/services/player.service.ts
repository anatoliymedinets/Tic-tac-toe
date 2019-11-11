import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from '../interfaces';

@Injectable({providedIn: 'root'})
export class PlayerService{
  constructor(private http: HttpClient){}

  approvePlayer(player: Player): Observable<Player>{
    return this.http.post<Player>('api/players', player)
  }

  updateStats(player: Player): Observable<Player>{
    return this.http.put<Player>('api/players',player)
  }
}