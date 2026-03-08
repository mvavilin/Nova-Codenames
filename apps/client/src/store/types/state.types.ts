import type { FormState } from '@/components/BaseForm/BaseFormTypes';

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
};
