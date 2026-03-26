import BaseComponent from '@/api/ComponentsAPI/base/BaseComponent';
import StatsCard from '../cards/StatsCard';
import RolesCard from '../cards/RolesCard';
import MatchHistoryCard from '../cards/MatchHistoryCard';
import AchievementsCard from '../cards/AchievementsCard';

export default class ProfileGrid extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      classes: 'grid grid-cols-2 gap-6',
    });

    this.setChildren([this.createLeft(), this.createRight()]);
  }

  private createLeft(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      classes: 'flex flex-col gap-6',
      children: [new StatsCard(), new RolesCard()],
    });
  }

  private createRight(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      classes: 'flex flex-col gap-6',
      children: [new MatchHistoryCard(), new AchievementsCard()],
    });
  }
}
