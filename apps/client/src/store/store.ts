import StateAPI from '../api/StateAPI';
import { initialState } from '@store/state';

import senderMiddleware from './middlewares/test.sender.middleware';
import fetcherMiddleware from './middlewares/test.fetcher.middleware';

import testReducer from './reducers/test.reducer';
import welcomeReducer from './reducers/welcome.reducer';
import registrationPageReducer from '@store/reducers/registration.reducer';

import loggerAfterware from '@store/afterwares/logger.afterware';
import storageAfterware from './afterwares/storage.afterware';
import welcomePageAfterware from '@store/afterwares/welcome.afterware';
import registrationPageAfterware from '@store/afterwares/registration.afterware';

import type { State } from '@store/types/state';
import type { Actions } from './types/action';

function loadState(): State {
  try {
    const saved = localStorage.getItem('store');
    if (!saved) return initialState;

    const parsed = JSON.parse(saved);

    return {
      ...initialState,
      ...parsed,
    };
  } catch {
    return initialState;
  }
}

const store = new StateAPI<State, Actions>(loadState());

store.addReducer(testReducer, welcomeReducer, registrationPageReducer);

store.addMiddleware(senderMiddleware(), fetcherMiddleware());
store.addAfterware(
  loggerAfterware(),
  storageAfterware('store'),
  welcomePageAfterware(),
  registrationPageAfterware()
);

export default store;
