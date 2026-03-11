import type {
  Player,
  RoomPreview,
  RoomSettings,
} from '../../../../packages/shared/src/types/room.ts';
import { Room } from './room.ts';

export class RoomManager {
  private lobby: Player[] = [];
  private rooms: Room[] = [];

  public addPlayerToLobby(userId: string, username: string): void {
    const player = this.lobby.find((item) => item.userId === userId);
    if (!player) {
      this.lobby.push({ userId, username });
    }
  }

  public createRoom(settings: RoomSettings): {
    payload: RoomPreview;
    recipients: string[];
  } {
    const room = new Room(settings);
    this.rooms.push(room);

    const roomPreview = room.getRoomPreview();
    const recipients = this.lobby.map((player) => player.userId);
    return { payload: roomPreview, recipients };
  }

  public getRoomPreviews(name?: string): { payload: RoomPreview[] } {
    let roomPreviews = this.rooms.map((room) => room.getRoomPreview());
    if (name) {
      const regExp = new RegExp(name, 'i');
      roomPreviews = roomPreviews.filter((preview) => regExp.test(preview.name));
    }
    return { payload: roomPreviews };
  }
}
