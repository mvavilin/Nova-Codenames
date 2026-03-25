import type { Player, Teams } from './room';

export interface GameInfo {
  redTeam: Player[];
  blueTeam: Player[];
  currentTeam: Teams;
}
