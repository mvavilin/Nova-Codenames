import type { ProfileGridProperties } from './ProfileGrid.types';

import { ContainerComponent } from '@ComponentsAPI';
import StatsCard from '../cards/StatsCard';
import RolesCard from '../cards/RolesCard';
import MatchHistoryCard from '../cards/MatchHistoryCard';
import AchievementsCard from '../cards/AchievementsCard';

export default class ProfileGrid extends ContainerComponent {
  constructor({ ...rest }: ProfileGridProperties = {}) {
    super({
      tag: 'main',
      classes: 'grid grid-cols-2 gap-6',
      ...rest,
    });

    this.setChildren([this.createLeft(), this.createRight()]);
  }

  private createLeft(): ContainerComponent {
    return new ContainerComponent({
      tag: 'section',
      classes: 'flex flex-col gap-6',
      children: [new StatsCard(), new RolesCard()],
    });
  }

  private createRight(): ContainerComponent {
    return new ContainerComponent({
      tag: 'section',
      classes: 'flex flex-col gap-6',
      children: [new MatchHistoryCard(), new AchievementsCard()],
    });
  }
}
