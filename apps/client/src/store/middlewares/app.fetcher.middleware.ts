import type { Middleware } from '@StateAPI';
import type { AppActions } from '@AppActions';
import { AppActionTypes } from '@actions';
import { socketClient } from '@SocketClientAPI';
import { removeSessionStorageData, showErrorToast } from '@utils';
import { SOCKET_ERROR_MESSAGES } from '@SocketClientAPI/socket.constants';
import TOKENS from '@constants/tokens';
import { router } from '@router';
import { URLS } from '@RouterAPI/router.constants';

export default function appFetcher<State>(): Middleware<State, AppActions> {
  return function middleware(context) {
    if (context.action.type === AppActionTypes.EXIT_APP) {
      try {
        removeSessionStorageData(TOKENS.AUTH);
        removeSessionStorageData(TOKENS.SESSION);

        router.navigate(URLS.LOGIN());

        socketClient.disconnect();
      } catch (error) {
        showErrorToast(error, SOCKET_ERROR_MESSAGES.ON_ERROR);
      }
    }

    return context.next(context.action);
  };
}
