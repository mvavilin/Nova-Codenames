import BaseComponent from '@/api/ComponentsAPI/base/BaseComponent';
import Card from './Card';

export default class MatchHistoryCard extends Card {
  constructor() {
    super('Последние игры', [
      match('🟢 Win', '+5', 'Operative'),
      match('🔴 Lose', '+2', 'Spymaster'),
      match('🟢 Win', '+6', 'Operative'),
    ]);
  }
}

function match(result: string, score: string, role: string): BaseComponent {
  return new BaseComponent({
    tag: 'div',
    classes: 'flex justify-between text-sm',
    children: [
      new BaseComponent({ tag: 'span', content: result }),
      new BaseComponent({ tag: 'span', content: score }),
      new BaseComponent({ tag: 'span', content: role }),
    ],
  });
}
