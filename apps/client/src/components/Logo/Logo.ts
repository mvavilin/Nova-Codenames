import { router } from '@router';
import { TextComponent } from '@ComponentsAPI';
import { URLS } from '@RouterAPI/router.constants';

const LOGO_CLASSES = `font-brand font-normal text-2xl leading-none tracking-[0.01rem] text-transparent [-webkit-text-stroke:1px_var(--color-brand)] text-center sm:text-left`;

export default class Logo extends TextComponent {
  constructor() {
    super({
      classes:
        `${LOGO_CLASSES} ${globalThis.location.pathname === URLS.LOBBY() ? 'cursor-pointer' : ''}`.trim(),
      content: 'Nova Codenames Game',
      listeners: {
        click: () => {
          if (globalThis.location.pathname === URLS.LOBBY()) router.navigate();
        },
      },
    });
  }
}
