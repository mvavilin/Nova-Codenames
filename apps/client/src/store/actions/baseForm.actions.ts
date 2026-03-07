import type { UpdateFieldPayload } from '@/components/BaseForm/BaseFormTypes';

export enum FormActions {
  FORM_UPDATE_FIELD = 'FORM_UPDATE_FIELD',
}

export type FormUpdateAction = {
  type: FormActions.FORM_UPDATE_FIELD;
  payload: UpdateFieldPayload;
};
