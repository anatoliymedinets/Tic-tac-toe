import { enGameState } from './enums';

export interface GameSession{
    firstPlayer: Player,
    secondPlayer: Player,
    cells: Cell[],
    steps: number,
    state: enGameState
}

export interface Player{
    id?: number,
    name: String,
    win?: number,
    lose?: number,
    draw?: number
}

export interface Cell{
    key: number,
    value?: String
}

export interface Game{
    id?: number,
    winnerId?: number | String,
    date: Date,
    steps: number,
    firstPlayerId: number,
    secondPlayerId: number,

    firstPlayer?: Player,
    secondPlayer?: Player
}