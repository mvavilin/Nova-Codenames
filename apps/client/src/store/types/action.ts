import type { WelcomePageActions } from '@actions/welcome.actions';

import type {
  TestPageActions,
  FormActions,
  SocketActions,
  LocalAppActions,
  RoomPageActions,
} from '@actions';

export type AppActions =
  | WelcomePageActions
  | TestPageActions
  | FormActions
  | SocketActions
  | LocalAppActions
  | RoomPageActions;
