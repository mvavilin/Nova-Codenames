import BaseComponent from '@/api/ComponentsAPI/base/BaseComponent';
import Card from './Card';

export default class StatsCard extends Card {
  constructor() {
    super('Статистика', [
      item('Игр сыграно', '42'),
      item('Победы', '28'),
      item('Поражения', '14'),
      item('Winrate', '68%'),
    ]);
  }
}

function item(label: string, value: string): BaseComponent {
  return new BaseComponent({
    tag: 'div',
    classes: 'flex justify-between text-sm',
    children: [
      new BaseComponent({ tag: 'span', content: label }),
      new BaseComponent({ tag: 'span', content: value }),
    ],
  });
}
