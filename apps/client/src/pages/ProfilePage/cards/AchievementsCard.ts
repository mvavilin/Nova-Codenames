import BaseComponent from '@/api/ComponentsAPI/base/BaseComponent';
import Card from './Card';

export default class AchievementsCard extends Card {
  constructor() {
    super('Достижения', [
      ach('🧠 10 правильных подряд'),
      ach('🎯 100 ответов'),
      ach('🏆 Первая победа'),
    ]);
  }
}

function ach(text: string): BaseComponent {
  return new BaseComponent({
    tag: 'div',
    content: text,
    classes: 'text-sm',
  });
}
