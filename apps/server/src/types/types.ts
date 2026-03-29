import type { ClientEvent, ServerEvent } from '../../../../packages/shared/src/socketEvents.ts';

export interface SessionRecord {
  sessionToken: string;
  userId: string;
  currentSocketId: string;
}

export interface SocketData {
  userId: string;
  username: string;
  sessionToken: string;
  isReconnect: boolean;
}

export const RECONNECT_MAX_TIME = 60_000;
export const VALUE_OF_KEY_FOR_SHOW_LOG = 'YES';
export const SECOND_COUNT_BEFORE_START_GAME = 15;
export const SECOND_COUNT_FOR_ASK_CLUE = 30;

type LogName<T> = T extends { type: infer K } ? K : never;

type LogPayload<T> = T extends { payload: infer K } ? K : never;

type DiscriminatedUnionToSocketEvents<T extends { type: string }> = {
  [K in LogName<T>]: LogPayload<Extract<T, { type: K }>>;
};

export type LogEmit = DiscriminatedUnionToSocketEvents<ServerEvent>;

export type LogOn = DiscriminatedUnionToSocketEvents<ClientEvent>;
