import BaseForm from '@/components/BaseForm/BaseForm';
import InputForm from '@/components/InputForm/InputForm';
import { formInputValues } from '@/components/InputForm/InputForm.constants';
import { ButtonComponent } from '@/api/ComponentsAPI';
import RegistrationHeading from '../RegistrationHeading/RegistartionHeading';
import { TranslationKeys } from '@/i18n/translationKeys';
import { t } from '@/i18n';
import type { State } from '@/store/types/state.types';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { FormActions } from '@/store/actions/form.actions';

export default class RegistrationForm extends BaseForm {
  constructor() {
    const title = new RegistrationHeading();
    const nameInput = new InputForm({
      ...formInputValues.username,
      formId: 'registration',
      fieldName: 'username',
    });

    const emailInput = new InputForm({
      ...formInputValues.email,
      formId: 'registration',
      fieldName: 'email',
    });

    const passwordInput = new InputForm({
      ...formInputValues.password,
      formId: 'registration',
      fieldName: 'password',
    });

    const submitButton = new ButtonComponent({
      content: t(TranslationKeys.REGISTRATION_SUBMIT_BTN),
      classes:
        'mt-6 bg-cyan-600 w-36 h-9 rounded-md font-main font-bold hover:cursor-pointer hover:bg-green-600 hover:transition-colors hover:duration-300',
      type: 'submit',
    });

    super({
      formId: 'registration',
      title: title,
      inputArray: [nameInput, emailInput, passwordInput],
      buttonSubmit: submitButton,
    });

    this.addSubscriptions([store.subscribe((state, action) => this.switchLanguage(state, action))]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === FormActions.SWITCH_LANGUAGE) {
      this.title.setContent(t(TranslationKeys.REGISTRATION_TITLE));
      this.buttonSubmit.setContent(t(TranslationKeys.REGISTRATION_SUBMIT_BTN));
    }
  }
}
