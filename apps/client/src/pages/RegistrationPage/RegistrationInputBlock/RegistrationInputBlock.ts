import { ContainerComponent } from '@/api/ComponentsAPI';
import { LabelComponent } from '@/api/ComponentsAPI';
import { InputComponent } from '@/api/ComponentsAPI';
import { TextComponent } from '@/api/ComponentsAPI';
import type { inputBlockProps } from './RegistrationInputBlock.types';

export default class RegistrationInputBlock extends ContainerComponent {
  constructor(options: inputBlockProps) {
    super({ classes: 'w-full flex flex-col self-center gap-1' });
    this.render(options);
  }

  private render(options: inputBlockProps): void {
    const label = new LabelComponent({
      classes: 'uppercase font-medium',
      content: options.labelText,
      htmlFor: options.id,
    });
    const span = new TextComponent({
      tag: 'span',
      classes: 'h-14 text-black text-xs md:text-sm font-medium',
    });

    const input = new InputComponent({
      id: options.id,
      type: options.type,
      name: options.name,
      placeholder: options.placeholder,
      autocomplete: options.autocomplete,
      classes:
        'px-12 py-8 bg-white/40 border border-solid border-black rounded-md outline-none transition-colors duration-300 hover:cursor-pointer hover:bg-white/60 focus:border-yellow',
    });

    if (options.minLength && options.maxLength) {
      input.setAttributes({ minLength: options.minLength, maxLength: options.maxLength });
    }

    input.setListeners({
      input: (event: Event) => {
        event.preventDefault();
        if (!input.isValidByRegex(options.pattern) || !input.isValid()) {
          input.removeClasses(inputFocusedClass);
          input.setClasses(inputInvalidClass);
          span.setContent(options.errorMessage);
          checkForm(this.inputArray, this.buttonSubmit);
        } else {
          input.removeClasses(inputInvalidClass);
          input.setClasses(inputFocusedClass);
          span.clearContent();
          checkForm(this.inputArray, this.buttonSubmit);
        }
      },
    });
    this.appendChildren([label, input, span]);
  }
}
