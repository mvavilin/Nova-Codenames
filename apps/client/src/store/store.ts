import StateAPI from '../api/StateAPI';
import initialState from './initialState';

import loggerMiddleware from './middlewares/logger.middleware';
import fetcherMiddleware from './middlewares/fetcher.middleware';

import registrationReducer from './reducers/registration.reducer';
import welcomeReducer from './reducers/welcome.reducer';

import loggerAfterware from '@/store/afterwares/logger.afterware';
import storageAfterware from './afterwares/storage.afterware';

const store = new StateAPI(initialState);

store.addReducer(registrationReducer, welcomeReducer);

store.addMiddleware(loggerMiddleware(), fetcherMiddleware());
store.addAfterware(loggerAfterware(), storageAfterware('store'));

export default store;
