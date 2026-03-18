import type { Action } from 'api/StateAPI';
import { type State } from '@/store/types/state';
import { WelcomeActions } from '../actions/welcome.actions';
import { CommonAppActionTypes } from '../actions';

export default function welcomePageReducer(state: State, action: Action): State {
  switch (action.type) {
    case WelcomeActions.GO_TO_LOGIN_PAGE: {
      return { ...state };
    }

    case WelcomeActions.GO_TO_REGISTRATION_PAGE: {
      return { ...state };
    }

    case CommonAppActionTypes.SWITCH_LANGUAGE: {
      return { ...state };
    }

    default: {
      return state;
    }
  }
}
