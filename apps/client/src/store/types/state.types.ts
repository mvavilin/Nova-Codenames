import type { FormState } from '@/components/BaseForm/BaseFormTypes';
import { Language } from '@/types';

export type State = {
  id: string | null;
  username: string | null;
  password: string | null;
  email: string | null;
  avatarUrl: string | null;
  authStatus: boolean;
  registration: FormState;
  login: FormState;
  profile: FormState;
  language: Language;
};
