import type { GlobalFormState } from '@/components/BaseForm/BaseFormTypes';
import { FormActions } from '../actions/baseForm.actions';
import type { Actions } from '../types/action.types';
import type { FieldName } from '@/components/InputForm/InputForm.type';
import type { FieldState } from '@/components/BaseForm/BaseFormTypes';

export default function baseFormReducer<State extends GlobalFormState>(
  state: State,
  action: Actions
): State {
  switch (action.type) {
    case FormActions.FORM_UPDATE_FIELD: {
      const { formId, fieldName, value, isValid, errorMessage } = action.payload;
      const currentForm = state[formId];
      if (!currentForm) return state;
      const updatedFields: Partial<Record<FieldName, FieldState>> = {
        ...currentForm.fields,
        [fieldName]: {
          value,
          isValid,
          error: errorMessage,
          isChanged: true,
        },
      };
      const isFormValid = Object.values(updatedFields).every((field) => field.isValid);

      // 4. Возвращаем НОВЫЙ стейт с обновленной формой
      return {
        ...state,
        [formId]: {
          ...currentForm,
          fields: updatedFields,
          isFormValid,
        },
      };
    }

    default: {
      return state;
    }
  }
}
