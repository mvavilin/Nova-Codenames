import type { State } from '@/store/types/state.types';
import { Language } from '@/types';

export const initialState: State = {
  id: null,
  username: null,
  password: null,
  email: null,
  avatarUrl: null,
  authStatus: false,
  registration: { fields: {}, isFormValid: false },
  login: { fields: {}, isFormValid: false },
  profile: { fields: {}, isFormValid: false },
  language: Language.RU,
};
