import { Language } from '@types';
import { TranslationKeys } from '../translationKeys';

const formLanguage = {
  [Language.EN]: {
    [TranslationKeys.FORM_LABEL_NAME]: 'Name',
    [TranslationKeys.FORM_LABEL_EMAIL]: 'Email',
    [TranslationKeys.FORM_LABEL_PASSWORD]: 'Password',
    [TranslationKeys.FORM_PLACEHOLDER_NAME]: 'Enter your name...',
    [TranslationKeys.FORM_PLACEHOLDER_EMAIL]: 'Enter your email...',
    [TranslationKeys.FORM_PLACEHOLDER_PASSWORD]: 'Enter your password...',
    [TranslationKeys.FORM_ERROR_MESSAGE_NAME]: `•\u00A0Minimum length is 2 characters, maximum length is 20 characters.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_EMAIL]: `•\u00A0Please enter a valid email address (e.g., name@domain.io).`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD]:
      '•\u00A0Minimum length is 6 characters.\n •\u00A0Password must contain one capital English letter and one special character.\n •\u00A0Only English letters are allowed.',
  },
  [Language.RU]: {
    [TranslationKeys.FORM_LABEL_NAME]: 'Имя',
    [TranslationKeys.FORM_LABEL_EMAIL]: 'Email',
    [TranslationKeys.FORM_LABEL_PASSWORD]: 'Пароль',
    [TranslationKeys.FORM_PLACEHOLDER_NAME]: 'Введите имя...',
    [TranslationKeys.FORM_PLACEHOLDER_EMAIL]: 'Введите email...',
    [TranslationKeys.FORM_PLACEHOLDER_PASSWORD]: 'Введите пароль...',
    [TranslationKeys.FORM_ERROR_MESSAGE_NAME]: `•\u00A0Минимальная длина 2 символа, максимальная длина 20 символов.`,
    [TranslationKeys.FORM_ERROR_MESSAGE_EMAIL]: `•\u00A0Пожалуйста введите валидный email (например, name@domain.io).`,
    [TranslationKeys.FORM_ERROR_MESSAGE_PASSWORD]: `•\u00A0Минимальная длина 6 символов.\n •\u00A0Пароль должен содержать одну заглавную английскую букву и один спецсимвол.\n •\u00A0Допускаются только английские буквы.`,
  },
};

export default formLanguage;
