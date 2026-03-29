import type { Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../../../packages/shared/src/socketEvents.ts';
import { roomManager, socketIdMap } from './sessionHandlers.ts';
import { io } from '../../app.ts';
import { logger } from '../logger/logger.ts';
import type { SocketData } from '../../types/types.ts';

export function setupGameHandlers(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  setupGameAddPlayerHandler(socket);
  setupClueGiveHandler(socket);
}

function setupGameAddPlayerHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;

  socket.on('game:add-player', () => {
    const response = roomManager.addPlayerToGame(userId);
    if ('error' in response) {
      const socketId = socketIdMap.get(userId);
      if (socketId) {
        io.to(socketId).emit('error', { code: response.error });
        logger.emit(userId, 'error', { code: response.error });
      }
    } else {
      const { game } = response;

      const playerIds = game.getPlayerIds();

      for (const playerId of playerIds) {
        const socketId = socketIdMap.get(playerId);
        if (socketId) {
          io.to(socketId).emit('game:start', { gameInfo: game.getGameInfo(playerId) });
        }
      }

      const spymasterId = game.askClue(() => {
        if (spymasterId) {
          const socketId = socketIdMap.get(spymasterId);
          if (socketId) {
            io.to(socketId).emit('game:clue-timeout');
          }
        }
      });
      if (spymasterId) {
        const socketId = socketIdMap.get(spymasterId);
        if (socketId) {
          io.to(socketId).emit('game:ask-clue');
        }
      }
    }
  });
}

function setupClueGiveHandler(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, object, SocketData>
): void {
  const { userId } = socket.data;
  socket.on('game:clue-give', ({ clue }) => {
    const game = roomManager.getGameByUserId(userId);

    if (game) {
      const response = game.giveClue(userId, clue);
      if (!('error' in response)) {
        const { clue, agentIds } = response;
        for (const agentId of agentIds) {
          const socketId = socketIdMap.get(agentId);
          if (socketId) {
            io.to(socketId).emit('game:clue-given', { clue });
            logger.emit(agentId, 'game:clue-given', { clue });
          }
        }
      }
    }
  });
}
