export enum AppActionTypes {
  EXIT_APP = 'APP/EXIT_APP',
}

type AppExit = {
  type: AppActionTypes.EXIT_APP;
};

export type LocalAppActions = AppExit;
