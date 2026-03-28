import { SocketActionTypes } from '@actions';
import store from '@store';
import { Button } from '@components/ui';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import { AppActionTypes } from '@/store/actions';

const JOIN_BUTTON_CLASSES = 'min-w-[78px] text-xs bg-green-600 hover:bg-green-700 mx-auto';

interface JoinButtonProperties {
  roomId: string;
  isCustom?: boolean;
}

export default class JoinButton extends Button {
  private unsubscribe: () => void;

  constructor({ roomId, isCustom = false }: JoinButtonProperties) {
    super({
      classes: isCustom ? JOIN_BUTTON_CLASSES : '',
      label: t(TranslationKeys.ROOM_ROW_JOIN_BUTTON),
      onClick: () => {
        store.dispatch({ type: SocketActionTypes.SOCKET_JOIN_ROOM, payload: { roomId } });
      },
    });

    this.unsubscribe = store.subscribe((state, action) => this.switchLanguage(state, action));
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.setLabel(t(TranslationKeys.ROOM_ROW_JOIN_BUTTON));
    }
  }

  public override destroy(): this {
    this.unsubscribe();
    return this;
  }
}
