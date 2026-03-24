import type { Player } from '../../../../packages/shared/src/types/room.ts';

export class Game {
  private redTeam: Player[] = [];
  private blueTeam: Player[] = [];

  constructor() {}

  public addPlayer(player: Player): void {
    if (player.team === 'red') this.redTeam.push(player);
    if (player.team === 'blue') this.blueTeam.push(player);
  }
}
