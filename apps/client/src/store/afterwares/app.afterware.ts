import type { Afterware } from '@StateAPI';
import { CommonAppActionTypes } from '@actions';

import { router } from '@router';
import { URLS } from '@RouterAPI/router.constants';

export default function appAfterware<State>(): Afterware<State> {
  return async function afterware(context) {
    if (context.action.type === CommonAppActionTypes.EXIT_APP) {
      sessionStorage.clear();
      router.navigate(URLS.LOGIN());
    }
  };
}
