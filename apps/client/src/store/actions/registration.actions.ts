export enum RegistrationActions {
  GO_TO_LOBBY_PAGE = 'REGISTRATION/GO_TO_LOBBY_PAGE',
}

export type GoToRegistrationPage = {
  type: RegistrationActions.GO_TO_LOBBY_PAGE;
};

export type RegistrationPageActions = GoToRegistrationPage;
