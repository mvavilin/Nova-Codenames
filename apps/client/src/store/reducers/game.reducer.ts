import type { State } from '@State';
import type { AppActions } from '@AppActions';
import { GameActionTypes } from '@actions';
import { initialState } from '@initialState';
import type { Teams } from '@repo/shared/src/types/room';

export default function gameReducer(state: State, action: AppActions): State {
  if (!state.game) {
    return {
      ...state,
      game: { ...initialState.game },
    };
  }

  switch (action.type) {
    // Таймер перед стартом игры
    case GameActionTypes.GAME_START_TIMER: {
      console.log('[GAME REDUCER] Старт таймера перед игрой');
      return {
        ...state,
        game: {
          ...state.game,
          startTimer: true,
        },
      };
    }

    // Старт игры, получение GameInfo
    case GameActionTypes.GAME_START: {
      console.log('[GAME REDUCER] Игра началась, получены карты и команды');
      return {
        ...state,
        game: {
          ...state.game,
          gameInfo: action.payload.gameInfo,
          cards: action.payload.gameInfo.cards,
          currentTeam: action.payload.gameInfo.currentTeam,
          redTeam: action.payload.gameInfo.redTeam,
          blueTeam: action.payload.gameInfo.blueTeam,
          startTimer: false,
          clue: null,
          gamePhase: 'clue',
          score: { red: 0, blue: 0 },
          selectedCardId: null,
          selectedByPlayers: [],
          guessPhaseInfo: null,
          answerPhaseInfo: null,
          checkPhaseInfo: null,
          finishPhaseInfo: null,
          gameEndInfo: null,
        },
      };
    }

    // Сервер запрашивает подсказку у шпиона
    case GameActionTypes.GAME_ASK_CLUE: {
      console.log('[GAME REDUCER] Ожидание подсказки от шпиона');
      return {
        ...state,
        game: {
          ...state.game,
          gamePhase: 'clue',
          isSpymaster: true,
          clue: null,
        },
      };
    }

    // Таймаут подсказки
    case GameActionTypes.GAME_CLUE_TIMEOUT: {
      console.log('[GAME REDUCER] Время подсказки истекло');
      return {
        ...state,
        game: {
          ...state.game,
          gamePhase: 'guess',
          isSpymaster: false,
        },
      };
    }

    // Смена хода
    case GameActionTypes.GAME_TURN_CHANGED: {
      console.log('[GAME REDUCER] Смена хода, новая команда:', action.payload.team);
      return {
        ...state,
        game: {
          ...state.game,
          currentTeam: action.payload.team,
          gamePhase: 'clue',
          clue: null,
          selectedCardId: null,
          selectedByPlayers: [],
          guessPhaseInfo: null,
          answerPhaseInfo: null,
          checkPhaseInfo: null,
        },
      };
    }

    // Подсказка передана агентам
    case GameActionTypes.GAME_CLUE_GIVEN: {
      console.log('[GAME REDUCER] Подсказка получена:', action.payload.clue);
      return {
        ...state,
        game: {
          ...state.game,
          clue: action.payload.clue,
          gamePhase: 'guess',
          isSpymaster: false,
        },
      };
    }

    // Игрок выбрал карту (для отображения выбора)
    case GameActionTypes.GAME_CARD_CHOSEN: {
      console.log('[GAME REDUCER] Карта выбрана:', action.payload.cardId);
      return {
        ...state,
        game: {
          ...state.game,
          selectedCardId: action.payload.cardId,
          selectedByPlayers: action.payload.players,
        },
      };
    }

    // Карта открыта, показать цвет
    case GameActionTypes.GAME_CARD_SHOWN: {
      console.log('[GAME REDUCER] Карта открыта, цвет:', action.payload.color);
      const updatedCards = state.game.cards.map((card) =>
        card.id === action.payload.cardId
          ? { ...card, color: action.payload.color, whoSees: new Set<Teams>(['red', 'blue']) }
          : card
      );
      return {
        ...state,
        game: {
          ...state.game,
          cards: updatedCards,
        },
      };
    }

    // Запрос ответа на вопрос карты (агенту)
    case GameActionTypes.GAME_ASK_ANSWER: {
      console.log('[GAME REDUCER] Запрос ответа на вопрос:', action.payload.word);
      return {
        ...state,
        game: {
          ...state.game,
          gamePhase: 'answer',
          answerPhaseInfo: {
            word: action.payload.word,
            question: action.payload.question,
            question_en: action.payload.question_en,
          },
        },
      };
    }

    // Таймаут ответа
    case GameActionTypes.GAME_ANSWER_TIMEOUT: {
      console.log('[GAME REDUCER] Время ответа истекло');
      return {
        ...state,
        game: {
          ...state.game,
          gamePhase: 'check',
          answerPhaseInfo: null,
        },
      };
    }

    // Запрос проверки ответа противоположной команде
    case GameActionTypes.GAME_ASK_CHECK: {
      console.log('[GAME REDUCER] Запрос проверки ответа:', action.payload.answer);
      return {
        ...state,
        game: {
          ...state.game,
          gamePhase: 'check',
          checkPhaseInfo: {
            word: action.payload.checkQuestion.word,
            question: action.payload.checkQuestion.question,
            question_en: action.payload.checkQuestion.question_en,
            referenceAnswer: action.payload.checkQuestion.referenceAnswer,
            referenceAnswer_en: action.payload.checkQuestion.referenceAnswer_en,
          },
        },
      };
    }

    // Результаты проверки
    case GameActionTypes.GAME_CHECK_RESULTS: {
      console.log('[GAME REDUCER] Результат проверки:', action.payload.correct);
      const newScore = { ...state.game.score };
      if (action.payload.correct && state.game.currentTeam === 'red') {
        newScore.red += 1;
      } else if (action.payload.correct && state.game.currentTeam === 'blue') {
        newScore.blue += 1;
      }
      return {
        ...state,
        game: {
          ...state.game,
          gamePhase: 'clue',
          score: newScore,
          checkPhaseInfo: null,
          answerPhaseInfo: null,
          selectedCardId: null,
          selectedByPlayers: [],
        },
      };
    }

    // Таймаут проверки
    case GameActionTypes.GAME_CHECK_TIMEOUT: {
      console.log('[GAME REDUCER] Время проверки истекло');
      return {
        ...state,
        game: {
          ...state.game,
          gamePhase: 'clue',
          checkPhaseInfo: null,
        },
      };
    }

    // Обновление счета
    case GameActionTypes.GAME_SEND_SCORE: {
      console.log('[GAME REDUCER] Обновление счета:', action.payload.score);
      return {
        ...state,
        game: {
          ...state.game,
          score: action.payload.score,
        },
      };
    }

    // Конец игры
    case GameActionTypes.GAME_GAME_END: {
      console.log('[GAME REDUCER] Конец игры, победитель:', action.payload.gameEndInfo.winningTeam);
      return {
        ...state,
        game: {
          ...state.game,
          gamePhase: 'finish',
          gameEndInfo: action.payload.gameEndInfo,
          finishPhaseInfo: { gameEndInfo: action.payload.gameEndInfo },
        },
      };
    }

    // Полное состояние игры от сервера
    case GameActionTypes.GAME_STATE: {
      console.log(
        '[GAME REDUCER] Получено состояние игры, фаза:',
        action.payload.gameState.gamePhase
      );
      return {
        ...state,
        game: {
          ...state.game,
          gameState: action.payload.gameState,
          cards: action.payload.gameState.cards,
          currentTeam: action.payload.gameState.currentTeam,
          isSpymaster: action.payload.gameState.isSpymaster,
          redTeam: action.payload.gameState.redTeam,
          blueTeam: action.payload.gameState.blueTeam,
          gamePhase: action.payload.gameState.gamePhase,
          gameTime: action.payload.gameState.gameTime,
          phaseTime: action.payload.gameState.phaseTime,
          score: action.payload.gameState.score,
          guessPhaseInfo: action.payload.gameState.gamePhaseInfo.guessPhaseInfo,
          answerPhaseInfo: action.payload.gameState.gamePhaseInfo.answerPhaseInfo,
          checkPhaseInfo: action.payload.gameState.gamePhaseInfo.checkPhaseInfo,
          finishPhaseInfo: action.payload.gameState.gamePhaseInfo.finishPhaseInfo,
        },
      };
    }

    // Отправка подсказки (клиент → сервер, стейт не меняем)
    case GameActionTypes.GAME_CLUE_GIVE:
    case GameActionTypes.GAME_CARD_CHOOSE:
    case GameActionTypes.GAME_ANSWER_GIVE:
    case GameActionTypes.GAME_CHECK_GIVE:
    case GameActionTypes.GAME_ADD_PLAYER:
    case GameActionTypes.GAME_ASK_GAME_STATE: {
      return state;
    }

    default: {
      return state;
    }
  }
}
