import type { FormType } from '../BaseForm/BaseFormTypes';

export type FieldName = 'username' | 'email' | 'password';

export interface InputFieldProps {
  id: string;
  type: 'text' | 'email' | 'password';
  name: string;
  autocomplete: 'on' | 'off';
  minLength?: string;
  maxLength?: string;
  pattern: RegExp;
  placeholder: string;
  labelText: string;
  errorMessage: string;
}

export interface InputBlockProps extends InputFieldProps {
  formId: FormType;
  fieldName: FieldName;
}
