import { ButtonComponent } from '@ComponentsAPI';
import { Icon } from '@components/ui';
import ICONS from '@assets/icons';

const EXIT_BUTTON_CLASSES = `w-10 h-10 bg-transparent hover:bg-white/10 flex items-center justify-center cursor-pointer`;

export default class ExitButton extends ButtonComponent {
  constructor() {
    super({ classes: EXIT_BUTTON_CLASSES, content: '' });

    this.appendChildren(new Icon({ url: ICONS.EXIT, size: 24 }));
  }
}
