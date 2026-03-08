import { type State } from '@/store/types/state.types';

export const mockInitialState: State = {
  id: null,
  username: null,
  email: null,
  password: null,
  authStatus: false,
  avatarUrl: null,
  registration: { fields: {}, isFormValid: false },
  login: { fields: {}, isFormValid: false },
  profile: { fields: {}, isFormValid: false },
};
