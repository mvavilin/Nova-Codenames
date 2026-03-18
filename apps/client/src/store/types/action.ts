import type { WelcomePageActions } from '@actions/welcome.actions';

import type { TestPageActions, FormActions, SocketActions, CommonAppActions } from '@actions';

export type AppActions =
  | WelcomePageActions
  | TestPageActions
  | FormActions
  | SocketActions
  | CommonAppActions;
