import { HeadingComponent } from '@/api/ComponentsAPI';
import { formHeadingText } from './RegistrationHeading.constants';

export default class RegistrationHeading extends HeadingComponent {
  constructor() {
    super({ classes: 'mb-4 text-3xl font-bold text-brand font-brand' });
    this.render();
  }
  private render(): void {
    const context = formHeadingText.ru.regHeading;
    if (typeof context === 'string') {
      this.setContent(context);
    }
  }
}
