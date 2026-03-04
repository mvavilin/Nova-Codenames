import { HeadingComponent } from '@/api/ComponentsAPI';
import { en } from '../registration.lang';
import type { RegistrationPageProps } from './RegistrationHeading.types';

export default class RegistrationHeading extends HeadingComponent {
  constructor({ ...rest }: RegistrationPageProps = {}) {
    super({ classes: 'mb-4 text-4xl font-bold text-brand font-brand', ...rest });
    this.render();
  }
  private render(): void {
    this.setContent(en.regHeading);
  }
}
