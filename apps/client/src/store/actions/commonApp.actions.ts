export enum CommonAppActionTypes {
  EXIT_APP = 'APP/EXIT_APP',
  SWITCH_LANGUAGE = 'SWITCH_LANGUAGE',
}

type ExitApp = {
  type: CommonAppActionTypes.EXIT_APP;
};

type SwitchLanguage = {
  type: CommonAppActionTypes.SWITCH_LANGUAGE;
};

export type CommonAppActions = ExitApp | SwitchLanguage;
