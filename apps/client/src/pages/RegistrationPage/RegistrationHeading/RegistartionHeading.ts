import { HeadingComponent } from '@/api/ComponentsAPI';
import { formHeadingText } from './RegistrationHeading.constants';

export default class RegistrationHeading extends HeadingComponent {
  constructor() {
    super({
      classes:
        'mb-4 text-2xl font-brand font-black text-black [text-stroke:0.5px_#FFE81F] [-webkit-text-stroke:0.5px_#FFE81F] drop-shadow-[0_0_10px_rgba(255,232,31,0.4)] paint-order: stroke fill;',
    });
    this.render();
  }
  private render(): void {
    const context = formHeadingText.ru.regHeading;
    if (typeof context === 'string') {
      this.setContent(context);
    }
  }
}
