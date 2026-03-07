import type { FormState } from '@/components/BaseForm/BaseFormTypes';

export interface State {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  status: string;
  page: string;
  title: string;
  count: number;
  registration: FormState;
  login: FormState;
  profile: FormState;
}

// suggestion

import { type UserStatus } from '@types';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  status: UserStatus;
  page: string;
  title: string;
  count: number;
  registration: FormState;
  login: FormState;
  profile: FormState;
}
