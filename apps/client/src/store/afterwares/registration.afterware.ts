import { URLS } from '@api/RouterAPI/router.constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { RegistrationActions } from '@store/actions/registration.actions';

export default function registrationPageAfterware<State>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === RegistrationActions.GO_TO_LOBBY_PAGE) {
      router.navigate(URLS.LOBBY());
    }
  };
}
