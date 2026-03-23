export interface RoomSettings {
  name: string;
  maxPlayers: number;
}

export type RoomStatus = 'waiting' | 'playing' | 'finishing';

export interface RoomPreview {
  id: string;
  name: string;
  maxPlayers: number;
  playerCount: number;
  status: RoomStatus;
}

export type Player = {
  userId: string;
  username: string;
  team: string;
  role: string;
};

export interface RoomInfo {
  id: string;
  name: string;
  maxPlayers: number;
  playerCount: number;
  redPlayers: Player[];
  bluePlayers: Player[];
  choosingPlayers: Player[];
}
