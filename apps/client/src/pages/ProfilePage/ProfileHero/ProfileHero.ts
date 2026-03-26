import type { ProfileHeroProperties } from './ProfileHero.types';

import { ContainerComponent, HeadingComponent, TextComponent } from '@ComponentsAPI';

export default class ProfileHero extends ContainerComponent {
  constructor({ ...rest }: ProfileHeroProperties = {}) {
    super({
      id: 'profile-hero',
      classes: `bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 mb-6`,
      ...rest,
    });

    this.setChildren([this.createTop(), this.createStats()]);
  }

  private createTop(): ContainerComponent {
    return new ContainerComponent({
      classes: 'flex items-center gap-4',
      children: [
        new ContainerComponent({
          classes: 'w-16 h-16 rounded-full bg-gray-300',
        }),
        new ContainerComponent({
          children: [
            new HeadingComponent({
              content: 'StarLeader26',
              classes: 'text-2xl font-bold',
            }),
            new TextComponent({
              content: '🟢 Online',
              classes: 'text-sm text-gray-300',
            }),
          ],
        }),
      ],
    });
  }

  private createStats(): ContainerComponent {
    return new ContainerComponent({
      classes: 'flex gap-8 mt-4',
      children: [
        this.stat('🏆 Level', '12'),
        this.stat('📊 Winrate', '68%'),
        this.stat('🎯 Correct', '124'),
      ],
    });
  }

  private stat(label: string, value: string): TextComponent {
    return new TextComponent({
      tag: 'span',
      content: `${label}: ${value}`,
    });
  }
}
