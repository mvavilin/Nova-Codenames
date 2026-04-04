import type { Player, RoomInfo, RoomPreview, Teams } from '@repo/shared/src/types/room';
import type { CardColor, GameStateForClient, Score } from '@repo/shared/src/types/game';
import type { GameInfo, GameEndInfo } from '@shared/types/game';
import type { ProfileInfo } from '@shared/types/profile';
import { ServerEventType, type ErrorCode, type UserStatus } from '@repo/shared/src/socketEvents';
import { ServerUrl } from '@repo/shared/src/api.constants';
import { BaseSocketClient } from '@SocketClientAPI';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import { showErrorToast } from '@utils';
import type { CheckQuestion } from '@repo/shared/src/types/question';

class SocketClient extends BaseSocketClient {
  constructor(serverUrl: string) {
    super(serverUrl);
  }

  // Session events
  public onSessionToken(handler: (payload: { sessionToken: string }) => void): void {
    this.socket.on(ServerEventType.SESSION_TOKEN, handler);
  }

  public onSessionConnect(
    handler: (payload: { userStatus: UserStatus; userId: string; username: string }) => void
  ): void {
    this.socket.on(ServerEventType.SESSION_CONNECT, handler);
  }

  public onSessionPlayerConnected(handler: (payload: { player: Player }) => void): void {
    this.socket.on(ServerEventType.SESSION_PLAYER_CONNECTED, handler);
  }

  public onSessionPlayerDisconnected(handler: (payload: { player: Player }) => void): void {
    this.socket.on(ServerEventType.SESSION_PLAYER_DISCONNECTED, handler);
  }

  public onSessionPlayerExit(handler: (payload: { player: Player }) => void): void {
    this.socket.on(ServerEventType.SESSION_PLAYER_EXIT, handler);
  }

  public onSessionSendStatus(
    handler: (payload: { userStatus: UserStatus; userId: string; username: string }) => void
  ): void {
    this.socket.on(ServerEventType.SESSION_SEND_STATUS, handler);
  }

  // Room events
  public onRoomCreated(handler: (payload: { roomPreview: RoomPreview }) => void): void {
    this.socket.on(ServerEventType.ROOM_CREATED, handler);
  }

  public onRoomUpdated(handler: (payload: { roomPreview: RoomPreview }) => void): void {
    this.socket.on(ServerEventType.ROOM_UPDATE_PREVIEW, handler);
  }

  public onRoomState(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.ROOM_STATE, handler);
  }

  public offRoomState(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.ROOM_STATE, listener);
  }

  public onRoomList(handler: (payload: { roomPreviews: RoomPreview[] }) => void): void {
    this.socket.on(ServerEventType.ROOM_SEND_LIST, handler);
  }

  public onPlayerJoined(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.ROOM_PLAYER_JOINED, handler);
  }

  public offPlayerJoined(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.ROOM_PLAYER_JOINED, listener);
  }

  public onPlayerLeft(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.ROOM_PLAYER_LEFT, handler);
  }

  public offPlayerLeft(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.ROOM_PLAYER_LEFT, listener);
  }

  // Team events
  public onTeamChanged(handler: (payload: { roomInfo: RoomInfo }) => void): void {
    this.socket.on(ServerEventType.TEAM_CHANGED, handler);
  }

  public offTeamChanged(listener: (payload: { roomInfo: RoomInfo }) => void): void {
    this._socket.off(ServerEventType.TEAM_CHANGED, listener);
  }

  // Game events
  public onGameStartTimer(handler: () => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_START_TIMER (таймер перед стартом игры)');
    this.socket.on(ServerEventType.GAME_START_TIMER, handler);
  }

  public offGameStartTimer(listener: () => void): void {
    this._socket.off(ServerEventType.GAME_START_TIMER, listener);
  }

  public onGameStart(handler: (payload: { gameInfo: GameInfo }) => void): void {
    console.log(
      '[SocketClient] Подписка на событие: GAME_START (старт игры, получение игровой информации)'
    );
    this.socket.on(ServerEventType.GAME_START, (payload) => {
      console.log('[SocketClient] Получено событие GAME_START:', { gameInfo: payload.gameInfo });
      handler(payload);
    });
  }

  public offGameStart(listener: (payload: { gameInfo: GameInfo }) => void): void {
    this._socket.off(ServerEventType.GAME_START, listener);
  }

  public onGameAskClue(handler: () => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_ASK_CLUE (запрос подсказки у шпиона)');
    this.socket.on(ServerEventType.GAME_ASK_CLUE, () => {
      console.log('[SocketClient] Получено событие GAME_ASK_CLUE');
      handler();
    });
  }

  public onGameClueTimeout(handler: () => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_CLUE_TIMEOUT (время подсказки истекло)');
    this.socket.on(ServerEventType.GAME_CLUE_TIMEOUT, () => {
      console.log('[SocketClient] Получено событие GAME_CLUE_TIMEOUT');
      handler();
    });
  }

  public onGameTurnChanged(handler: (payload: { team: Teams }) => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_TURN_CHANGED (смена хода)');
    this.socket.on(ServerEventType.GAME_TURN_CHANGED, (payload) => {
      console.log('[SocketClient] Получено событие GAME_TURN_CHANGED:', { team: payload.team });
      handler(payload);
    });
  }

  public onGameClueGiven(handler: (payload: { clue: string }) => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_CLUE_GIVEN (подсказка передана агентам)');
    this.socket.on(ServerEventType.GAME_CLUE_GIVEN, (payload) => {
      console.log('[SocketClient] Получено событие GAME_CLUE_GIVEN:', { clue: payload.clue });
      handler(payload);
    });
  }

  public onGameCardChosen(handler: (payload: { cardId: string; players: Player[] }) => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_CARD_CHOSEN (выбор карты игроками)');
    this.socket.on(ServerEventType.GAME_CARD_CHOSEN, (payload) => {
      console.log('[SocketClient] Получено событие GAME_CARD_CHOSEN:', {
        cardId: payload.cardId,
        players: payload.players,
      });
      handler(payload);
    });
  }

  public onGameCardShown(handler: (payload: { cardId: string; color: CardColor }) => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_CARD_SHOWN (карта открыта)');
    this.socket.on(ServerEventType.GAME_CARD_SHOWN, (payload) => {
      console.log('[SocketClient] Получено событие GAME_CARD_SHOWN:', {
        cardId: payload.cardId,
        color: payload.color,
      });
      handler(payload);
    });
  }

  public onGameAskAnswer(
    handler: (payload: {
      word: string;
      question: string;
      question_en: string;
      answer: boolean;
    }) => void
  ): void {
    console.log(
      '[SocketClient] Подписка на событие: GAME_ASK_ANSWER (запрос ответа на вопрос карты)'
    );
    this.socket.on(ServerEventType.GAME_ASK_ANSWER, (payload) => {
      console.log('[SocketClient] Получено событие GAME_ASK_ANSWER:', {
        word: payload.word,
        question: payload.question,
        answer: payload.answer,
      });
      handler(payload);
    });
  }

  public onGameAnswerTimeout(handler: () => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_ANSWER_TIMEOUT (время ответа истекло)');
    this.socket.on(ServerEventType.GAME_ANSWER_TIMEOUT, () => {
      console.log('[SocketClient] Получено событие GAME_ANSWER_TIMEOUT');
      handler();
    });
  }

  public onGameAskCheck(
    handler: (payload: { answer: string; checkQuestion: CheckQuestion; check: boolean }) => void
  ): void {
    console.log(
      '[SocketClient] Подписка на событие: GAME_ASK_CHECK (запрос проверки ответа у противоположной команды)'
    );
    this.socket.on(ServerEventType.GAME_ASK_CHECK, (payload) => {
      console.log('[SocketClient] Получено событие GAME_ASK_CHECK:', {
        answer: payload.answer,
        check: payload.check,
      });
      handler(payload);
    });
  }

  public onGameCheckResults(handler: (payload: { correct: boolean }) => void): void {
    console.log(
      '[SocketClient] Подписка на событие: GAME_CHECK_RESULTS (результаты проверки ответа)'
    );
    this.socket.on(ServerEventType.GAME_CHECK_RESULTS, (payload) => {
      console.log('[SocketClient] Получено событие GAME_CHECK_RESULTS:', {
        correct: payload.correct,
      });
      handler(payload);
    });
  }

  public onGameCheckTimeout(handler: () => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_CHECK_TIMEOUT (время проверки истекло)');
    this.socket.on(ServerEventType.GAME_CHECK_TIMEOUT, () => {
      console.log('[SocketClient] Получено событие GAME_CHECK_TIMEOUT');
      handler();
    });
  }

  public onGameSendScore(handler: (payload: { score: Score }) => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_SEND_SCORE (отправка счета)');
    this.socket.on(ServerEventType.GAME_SEND_SCORE, (payload) => {
      console.log('[SocketClient] Получено событие GAME_SEND_SCORE:', { score: payload.score });
      handler(payload);
    });
  }

  public onGameGameEnd(handler: (payload: { gameEndInfo: GameEndInfo }) => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_GAME_END (конец игры)');
    this.socket.on(ServerEventType.GAME_GAME_END, (payload) => {
      console.log('[SocketClient] Получено событие GAME_GAME_END:', {
        gameEndInfo: payload.gameEndInfo,
      });
      handler(payload);
    });
  }

  public onGameState(handler: (payload: { gameState: GameStateForClient }) => void): void {
    console.log('[SocketClient] Подписка на событие: GAME_STATE (текущее состояние игры)');
    this.socket.on(ServerEventType.GAME_STATE, (payload) => {
      console.log('[SocketClient] Получено событие GAME_STATE:', { gameState: payload.gameState });
      handler(payload);
    });
  }

  // Profile events
  public onProfileEntered(handler: (payload: { profileInfo: ProfileInfo }) => void): void {
    this.socket.on(ServerEventType.PROFILE_ENTERED, handler);
  }

  public onProfileLeft(handler: (payload: { roomPreviews: RoomPreview[] }) => void): void {
    this.socket.on(ServerEventType.PROFILE_LEFT, handler);
  }

  // Error events
  public onError(handler: (payload: { code: ErrorCode }) => void): void {
    try {
      this.socket.on(ServerEventType.ERROR, handler);
    } catch (error) {
      showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
    }
  }

  public onConnectError(handler: (error: Error) => void): void {
    this.socket.on(ServerEventType.CONNECT_ERROR, handler);
  }

  public onConnect(handler: () => void): void {
    this.socket.on(ServerEventType.CONNECT, handler);
  }
}

const socketClient = new SocketClient(ServerUrl.DEPLOY_BASE);
export default socketClient;
