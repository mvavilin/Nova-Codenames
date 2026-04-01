import type { Player, Teams } from './room.ts';

export type CardColor = 'red' | 'blue' | 'neutral' | 'bomb' | 'unknown';
export type CardStatus = 'hidden' | 'revealed';

export enum CardCounts {
  RED = 9,
  BLUE = 8,
  NEUTRAL = 7,
  BOMB = 1,
  ALL = RED + BLUE + NEUTRAL + BOMB,
}

export interface Card {
  id: string;
  word: string;
  color: CardColor;
  whoSees: Set<Teams>;
}

export interface GameInfo {
  id: string;
  redTeam: Player[];
  blueTeam: Player[];
  currentTeam: Teams;
  cards: Card[];
}

export interface PlayerScore {
  id: string;
  username: string;
  score: number;
  attempts: number;
}

export interface GameEndInfo {
  winningTeam: Teams;
  win: boolean;
  bombRevealed: boolean;
  score: {
    red: number;
    blue: number;
  };
  time: number;
  redPlayerScores: PlayerScore[];
  bluePlayerScores: PlayerScore[];
}
