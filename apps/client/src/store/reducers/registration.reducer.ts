import type { Action } from 'api/StateAPI';
import { RegistrationActions } from '@store/actions/registration.actions';
import { Language } from '@types';

export default function registrationPageReducer<State>(state: State, action: Action): State {
  switch (action.type) {
    case RegistrationActions.GO_TO_LOBBY_PAGE: {
      return {
        ...state,

        id: 'usr_a1b2c3d4',
        username: 'Alice',
        email: 'alice101@example.com',
        authStatus: true,
        language: Language.RU,
      };
    }

    default: {
      return state;
    }
  }
}
