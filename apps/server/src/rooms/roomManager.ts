import type { Player } from '../../../../packages/shared/src/types/room.ts';
import type { Room } from './room.ts';

export class RoomManager {
  private lobby: Player[] = [];
  private rooms: Room[] = [];

  public addPlayerToLobby(userId: string, username: string): void {
    const player = this.lobby.find((item) => item.userId === userId);
    if (!player) {
      this.lobby.push({ userId, username });
    }
    console.log(this.lobby);
  }
}
