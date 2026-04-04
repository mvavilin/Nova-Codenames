import type { State } from '../types/state';
import { FormActionTypes } from '../actions/form.actions';
import store from '../store';
import { saveSessionStorageData } from '@/utils';

import { SocketActionTypes } from '../actions/socket.actions';
import { AppActionTypes } from '../actions';
import type { AppActions } from '../types';
import { TOKENS } from '@/constants/tokens';

export default function formReducer(state: State, action: AppActions): State {
  switch (action.type) {
    case FormActionTypes.FORM_UPDATE_FIELD: {
      const { formId, fieldName, value, isValid } = action.payload;
      const currentForm = state[formId];
      const fields = { ...currentForm.fields };

      const updatedField = {
        value,
        isValid,
        isChanged: true,
      };

      fields[fieldName] = updatedField;

      if (formId === 'registration') {
        const passwordField = fields.password;
        const confirmField = fields.confirmPassword;

        if (passwordField && confirmField) {
          const isMatched =
            passwordField.value === confirmField.value && confirmField.value.length > 0;
          if (fields.confirmPassword) {
            fields.confirmPassword = {
              ...confirmField,

              isValid: isMatched,
              isChanged: confirmField.isChanged || fieldName === 'password',
            };
          }
        }
      }

      const isFormValid = Object.values(fields).every((field) => field.isValid);

      return {
        ...state,
        [formId]: {
          ...currentForm,
          fields,
          isFormValid,
        },
      };
    }

    case FormActionTypes.FETCH_SUCCESS: {
      if (action.payload.token) {
        saveSessionStorageData(TOKENS.AUTH, action.payload.token);

        store.dispatch({
          type: SocketActionTypes.SOCKET_CONNECT,
          payload: { authToken: action.payload.token },
        });
      }

      return {
        ...state,
        authStatus: true,
        id: action.payload.user.id,
        email: action.payload.user.email,
        username: action.payload.user.username,
        // registration: {
        //   fields: {},
        //   isFormValid: false,
        // },
        // login: { fields: {}, isFormValid: false },
      };
    }

    case FormActionTypes.GO_TO_WELCOME_PAGE:
    case FormActionTypes.GO_TO_LOGIN_PAGE:
    case FormActionTypes.GO_TO_REGISTRATION_PAGE:
    case AppActionTypes.SWITCH_LANGUAGE: {
      return { ...state };
    }

    default: {
      return state;
    }
  }
}
