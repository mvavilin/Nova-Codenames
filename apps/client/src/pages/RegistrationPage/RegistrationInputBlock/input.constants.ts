import type { inputBlockProps } from './RegistrationInputBlock.types';

export const inputNameInfo: inputBlockProps = {
  id: 'userName',
  type: 'text',
  name: 'nameInput',
  autocomplete: 'off',
  minLength: '2',
  maxLength: '16',
  pattern: /^[a-za-яёA-ZА-ЯЁ0-9-]+$/,
};

export const inputEmailInfo: inputBlockProps = {
  id: 'userEmail',
  type: 'email',
  name: 'emailInput',
  autocomplete: 'off',
  minLength: '6',
  maxLength: '30',
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export const inputPasswordInfo: inputBlockProps = {
  id: 'userPassword',
  type: 'password',
  name: 'passwordInput',
  autocomplete: 'off',
  minLength: '6',
  maxLength: '12',
  pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/,
};
