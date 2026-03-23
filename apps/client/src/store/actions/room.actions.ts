import type { RoomInfo, Player } from '@shared/types/room';

export enum RoomPageActionTypes {
  SET_ROOM_DATA = 'ROOM/SET_ROOM_DATA',
  CLEAR_ROOM_DATA = 'ROOM/CLEAR_ROOM_DATA',
  CHOOSE_TEAM = 'ROOM/CHOOSE_TEAM',
  LEAVE_TEAM = 'ROOM/LEAVE_TEAM',
  LEAVE_ROOM = 'ROOM/LEAVE_ROOM',
}

export type RoomSetData = {
  type: RoomPageActionTypes.SET_ROOM_DATA;
  payload: { roomInfo: RoomInfo };
};

export type RoomClearData = {
  type: RoomPageActionTypes.CLEAR_ROOM_DATA;
};

export type RoomChooseTeam = {
  type: RoomPageActionTypes.CHOOSE_TEAM;
  payload: Player;
};

export type RoomLeaveTeam = {
  type: RoomPageActionTypes.LEAVE_TEAM;
  payload: Player;
};

export type RoomLeaveRoom = {
  type: RoomPageActionTypes.LEAVE_ROOM;
  payload: Player;
};

export type RoomPageActions =
  | RoomSetData
  | RoomClearData
  | RoomChooseTeam
  | RoomLeaveTeam
  | RoomLeaveRoom;
