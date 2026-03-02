import type { Action } from 'api/StateAPI';
import { RegistrationActions } from '../actions/registration.actions';

export default function regPageReducer<State>(state: State, action: Action): State {
  switch (action.type) {
    case RegistrationActions.GO_TO_WELCOME_PAGE: {
      return { ...state, page: 'welcome' };
    }

    default: {
      return state;
    }
  }
}
