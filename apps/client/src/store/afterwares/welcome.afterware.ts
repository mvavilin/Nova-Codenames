import { URLS } from '@api/RouterAPI/router.constants';
import { router } from '@/main';
import type { Afterware } from '@api/StateAPI';
import { WelcomeActions } from '@store/actions/welcome.actions';

export default function welcomePageAfterware<State>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === WelcomeActions.GO_TO_REGISTRATION_PAGE) {
      router.navigate(URLS.REGISTRATION());
    }
  };
}
