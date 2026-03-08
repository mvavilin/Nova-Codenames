import StateAPI from '../api/StateAPI';
import { initialState } from '@/store/initialstate';

import senderMiddleware from './middlewares/test.sender.middleware';
import fetcherMiddleware from './middlewares/test.fetcher.middleware';

import testReducer from './reducers/test.reducer';
import welcomeReducer from './reducers/welcome.reducer';
import registrationPageReducer from '@store/reducers/registration.reducer';
import baseFormReducer from './reducers/baseForm.reducer';

import loggerAfterware from '@store/afterwares/logger.afterware';
import storageAfterware from './afterwares/storage.afterware';
import welcomePageAfterware from '@store/afterwares/welcome.afterware';
import registrationPageAfterware from '@store/afterwares/registration.afterware';

import type { State } from '@/store/types/state.types';
import type { Actions } from './types/action.types';

const store = new StateAPI<State, Actions>(initialState);

store.addReducer(testReducer, welcomeReducer, registrationPageReducer, baseFormReducer);

store.addMiddleware(senderMiddleware(), fetcherMiddleware());
store.addAfterware(
  loggerAfterware(),
  storageAfterware('store'),
  welcomePageAfterware(),
  registrationPageAfterware()
);

export default store;
