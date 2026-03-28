import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SectionHeading } from '@components';
import { SECTION_CLASSES } from '@constants/styles';
import { JoinRoomForm } from '@pages/LobbyPage/components/forms';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes } from '@/store/actions';

export default class JoinRoomSection extends BaseComponent {
  private heading: HeadingComponent;
  private unsubscribe: () => void;

  constructor() {
    super({ classes: SECTION_CLASSES.JOIN_ROOM_SECTION });

    this.heading = new SectionHeading({ title: t(TranslationKeys.JOIN_ROOM_SECTION_TITLE) });

    this.render();

    this.unsubscribe = store.subscribe((state, action) => this.switchLanguage(state, action));
  }

  private render(): void {
    this.appendChildren([this.heading, new JoinRoomForm()]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.heading.setContent(t(TranslationKeys.JOIN_ROOM_SECTION_TITLE));
    }
  }

  public override destroy(): this {
    this.unsubscribe();
    return this;
  }
}
