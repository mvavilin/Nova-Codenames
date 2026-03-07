import type { WelcomePageActions } from '../actions/welcome.actions';
import type { RegistrationPageActions } from '../actions/registration.actions';
import type { FormUpdateAction } from '../actions/baseForm.actions';

export type Actions = WelcomePageActions | RegistrationPageActions | FormUpdateAction;
