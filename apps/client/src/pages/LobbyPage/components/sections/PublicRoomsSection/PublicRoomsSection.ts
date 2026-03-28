import { BaseComponent, HeadingComponent } from '@ComponentsAPI';
import { SECTION_CLASSES } from '@constants/styles';
import { SectionHeading } from '@components';
import { RoomsTable } from '@pages/LobbyPage/components';
import { SearchRoomForm } from '@pages/LobbyPage/components/forms';
import { t } from '@i18n';
import { TranslationKeys } from '@i18n/translationKeys';
import type { State } from '@/store/types/state';
import type { Action } from '@/api/StateAPI';
import store from '@/store/store';
import { AppActionTypes } from '@/store/actions';

export default class PublicRoomsSection extends BaseComponent {
  private heading: HeadingComponent;
  private unsubscribe: () => void;

  constructor() {
    super({ classes: SECTION_CLASSES.PUBLIC_ROOMS_SECTION });

    this.heading = new SectionHeading({ title: t(TranslationKeys.PUBLIC_ROOMS_SECTION_TITLE) });

    this.render();

    this.unsubscribe = store.subscribe((state, action) => this.switchLanguage(state, action));
  }

  private render(): void {
    const roomsTable = new RoomsTable();

    this.appendChildren([this.heading, new SearchRoomForm(roomsTable), roomsTable]);
  }

  private switchLanguage(_state: State, action: Action): void {
    if (action.type === AppActionTypes.SWITCH_LANGUAGE) {
      this.heading.setContent(t(TranslationKeys.PUBLIC_ROOMS_SECTION_TITLE));
    }
  }

  public override destroy(): this {
    this.unsubscribe();
    return this;
  }
}
