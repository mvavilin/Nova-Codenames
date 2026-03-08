import type { Language } from '@types';

export type State = {
  id: string | null;
  username: string | null;
  email: string | null;
  authStatus: boolean;
  language: Language;
};
