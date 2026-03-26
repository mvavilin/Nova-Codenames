import BaseComponent from '@/api/ComponentsAPI/base/BaseComponent';

export default class Card extends BaseComponent {
  constructor(title: string, children: BaseComponent[]) {
    super({
      tag: 'div',
      classes: `bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4`,
      children: [
        new BaseComponent({
          tag: 'h2',
          content: title,
          classes: 'text-lg font-semibold mb-3',
        }),
        ...children,
      ],
    });
  }
}
