import { ContainerComponent } from '@api/ComponentsAPI';
import { Header } from '@components';
import { LOBBY_PAGE_BACKGROUND } from '@assets/backgrounds';

const LOBBY_PAGE_CLASSES = `w-full h-full flex flex-col items-center justify-start gap-10 px-20 py-10 bg-cover bg-center font-text`;

export default class LobbyPage extends ContainerComponent {
  constructor() {
    super({ id: 'lobby-page', classes: LOBBY_PAGE_CLASSES });

    this.setStyle({ backgroundImage: `url(${LOBBY_PAGE_BACKGROUND})` });

    this.render();
  }

  private render(): void {
    this.appendChildren([new Header()]);
  }
}
