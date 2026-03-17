import type { Server, Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../packages/shared/src/socketEvents.ts';
import type { RoomManager } from '../rooms/roomManager.ts';
import { socketIdMap } from '../app.ts';
import type { SocketData } from '../types/types.ts';

export function setupSocketHandlers(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>,
  roomManager: RoomManager
): void {
  const { userId, username } = socket.data;

  socket.on('room:create', ({ settings }) => {
    const { payload, recipients } = roomManager.createRoom(settings);
    for (const recipient of recipients) {
      const socketId = socketIdMap.get(recipient);
      if (socketId) {
        io.to([socketId]).emit('room:created', { roomPreview: payload });
      }
    }
  });

  socket.on('room:ask-list', () => {
    const { payload } = roomManager.getRoomPreviews();
    const socketId = socketIdMap.get(userId);
    if (socketId) {
      io.to(socketId).emit('room:send-list', { roomPreviews: payload });
    }
  });

  socket.on('room:search', ({ name }) => {
    const { payload } = roomManager.getRoomPreviews(name);
    const socketId = socketIdMap.get(userId);
    if (socketId) {
      io.to(socketId).emit('room:send-list', { roomPreviews: payload });
    }
  });

  socket.on('session:ask-status', () => {
    const { userStatus } = roomManager.getStatus(userId, username);
    const socketId = socketIdMap.get(userId);
    if (socketId) {
      io.to(socketId).emit('session:send-status', { userStatus });
    }
  });

  setupRoomJoinEvent(io, socket, roomManager);
  setupRoomLeaveEvent(io, socket, roomManager);
  setupSendRoomInfoEvent(io, socket, roomManager);
}

function setupRoomJoinEvent(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>,
  roomManager: RoomManager
): void {
  const userId = socket.data.userId;

  socket.on('room:join', ({ roomId }) => {
    const response = roomManager.joinToRoom(userId, roomId);
    if ('error' in response) {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
      }
    } else {
      const { payload, player, lobbyRecipients, roomRecipients } = response;
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('room:state', { roomInfo: payload.getRoomInfo() });
      }

      for (const recipient of lobbyRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:update-review', { roomPreview: payload.getRoomPreview() });
        }
      }

      for (const recipient of roomRecipients) {
        const socketId = socketIdMap.get(recipient);
        if (socketId) {
          io.to(socketId).emit('room:player-joined', { player });
        }
      }
    }
  });
}

function setupRoomLeaveEvent(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>,
  roomManager: RoomManager
): void {
  socket.on('room:leave', () => {
    roomLeaveHandler(io, socket, roomManager);
  });
}

export function roomLeaveHandler(io: Server, socket: Socket, roomManager: RoomManager): void {
  const userId = socket.data.userId;
  const response = roomManager.leaveRoom(userId);
  if ('error' in response) {
    const socketId = socketIdMap.get(userId);
    if (socketId) {
      io.to(socketId).emit('error', { code: response.error });
    }
  } else {
    const { payload, player, lobbyRecipients, roomRecipients } = response;

    const socketId = socketIdMap.get(userId);
    const roomPreviews = roomManager.getRoomPreviews();
    if (socketId && roomPreviews) {
      io.to(socketId).emit('room:send-list', { roomPreviews });
    }

    for (const recipient of lobbyRecipients) {
      const socketId = socketIdMap.get(recipient);
      if (socketId) {
        io.to(socketId).emit('room:update-review', { roomPreview: payload });
      }
    }

    for (const recipient of roomRecipients) {
      const socketId = socketIdMap.get(recipient);
      if (socketId) {
        io.to(socketId).emit('room:player-left', { player });
      }
    }
  }
}

function setupSendRoomInfoEvent(
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>,
  roomManager: RoomManager
): void {
  const userId = socket.data.userId;

  socket.on('room:ask-room-info', () => {
    const response = roomManager.getRoomInfo(userId);
    const socketId = socketIdMap.get(userId);
    if (socketId) {
      if (response) {
        io.to(socketId).emit('room:state', { roomInfo: response });
      } else {
        io.to(socketId).emit('error', { code: 'ROOM_NOT_FOUND' });
      }
    }
  });
}
