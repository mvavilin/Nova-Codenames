import type { FormState } from '@components/BaseForm/BaseForm.types';
import { Language, type RoomPreview } from '@types';
import type { RoomInfo } from '@shared/types/room';

import type {
  GameInfo,
  GameStateForClient,
  Card,
  GAME_PHASE,
  GameEndInfo,
  Score,
  GuessPhaseInfo,
  AnswerPhaseInfo,
  CheckPhaseInfo,
  FinishPhaseInfo,
} from '@repo/shared/src/types/game';
import type { Teams, Player } from '@repo/shared/src/types/room';

export type State = {
  id: string | null;
  username: string | null;
  email: string | null;
  authStatus: boolean;
  language: Language;
  registration: FormState;
  login: FormState;
  profile: FormState;
  rooms: RoomPreview[];
  currentRoom: RoomInfo | null;

  game: {
    gameInfo: GameInfo | null;
    gameState: GameStateForClient | null;
    currentTeam: Teams | null;
    cards: Card[];
    score: Score;
    clue: string | null;
    isSpymaster: boolean;
    gamePhase: GAME_PHASE;
    phaseTime: number;
    gameTime: number;
    selectedCardId: string | null;
    selectedByPlayers: Player[];
    guessPhaseInfo: GuessPhaseInfo | null;
    answerPhaseInfo: AnswerPhaseInfo | null;
    checkPhaseInfo: CheckPhaseInfo | null;
    finishPhaseInfo: FinishPhaseInfo | null;
    gameEndInfo: GameEndInfo | null;
    startTimer: boolean;
    redTeam: Player[];
    blueTeam: Player[];
  };
};
