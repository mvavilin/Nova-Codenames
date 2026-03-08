import { type State } from '@store/types/state';
import { Language } from '@types';

const mockInitialState: State = {
  id: null,
  username: null,
  email: null,
  authStatus: false,
  language: Language.RU,
};

export default mockInitialState;
