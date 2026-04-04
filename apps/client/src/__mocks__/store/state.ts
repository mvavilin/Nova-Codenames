import { type State } from '@/store/types/state';
import { Language } from '@types';

const mockInitialState: State = {
  id: null,
  username: null,
  email: null,
  authStatus: false,
  language: Language.RU,
  registration: { fields: {}, isFormValid: false },
  login: { fields: {}, isFormValid: false },
  profile: { fields: {}, isFormValid: false },
  rooms: [],
  currentRoom: null,

  game: {
    gameInfo: null,
    gameState: null,
    currentTeam: null,
    cards: [],
    score: { red: 0, blue: 0 },
    clue: null,
    isSpymaster: false,
    gamePhase: 'clue',
    phaseTime: 0,
    gameTime: 0,
    selectedCardId: null,
    selectedByPlayers: [],
    guessPhaseInfo: null,
    answerPhaseInfo: null,
    checkPhaseInfo: null,
    finishPhaseInfo: null,
    gameEndInfo: null,
    startTimer: false,
    redTeam: [],
    blueTeam: [],
  },
};

export default mockInitialState;
