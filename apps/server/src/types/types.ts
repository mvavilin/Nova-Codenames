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
