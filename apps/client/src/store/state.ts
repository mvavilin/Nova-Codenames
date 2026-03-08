import type { State } from '@store/types/state';
import { Language } from '@types';

// export const initialState: State = {
//   id: null,
//   username: null,
//   email: null,
//   authStatus: false,
//   language: Language.RU,
// };

export const initialState: State = {
  id: 'usr_a1b2c3d4',
  username: 'Alice',
  email: 'alice101@example.com',
  authStatus: true,
  language: Language.RU,
};
