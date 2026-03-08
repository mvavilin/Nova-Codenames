import type { FormState } from '@/components/BaseForm/BaseFormTypes';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: string | null;
  username: string | null;
  password: string | null;
  email: string | null;
  avatarUrl?: string | null;
  preferredLanguage?: 'ru' | 'en';
  theme?: 'light' | 'dark';
  registration: FormState;
  login: FormState;
  profile: FormState;
}

export interface AuthResult {
  user: User;
  token: string | null;
}
