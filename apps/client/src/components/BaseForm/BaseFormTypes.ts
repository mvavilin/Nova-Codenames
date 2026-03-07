import type { ButtonComponent } from '@/api/ComponentsAPI';
import type { FieldName } from '../InputForm/InputForm.type';
import type InputForm from '../InputForm/InputForm';
import type RegistrationHeading from '@/pages/RegistrationPage/RegistrationHeading/RegistartionHeading';

export type FormType = 'registration' | 'login' | 'profile';

export interface BaseFormProps {
  formId: FormType;
  title: RegistrationHeading;
  inputArray: InputForm[];
  buttonSubmit: ButtonComponent;
}

export interface UpdateFieldPayload {
  formId: FormType;
  fieldName: FieldName;
  value: string;
  isValid: boolean;
  errorMessage: string;
}

export interface FieldState {
  value: string;
  isValid: boolean;
  isChanged: boolean;
  error: string;
}

export interface FormState {
  fields: Partial<Record<FieldName, FieldState>>;
  isFormValid: boolean;
}

export interface GlobalFormState {
  registration: FormState;
  login: FormState;
  profile: FormState;
}
