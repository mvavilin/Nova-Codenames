import { ButtonComponent, ContainerComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomInfoProps } from './RoomInfo.types';

const styles = {
  container:
    'w-2/5 flex flex-wrap justify-center lg:justify-between items-center gap-5 text-white text-2xl font-bold bg-white/25 px-6 py-4 rounded',
  textContainer: 'flex flex-col w-[50%]',
  title: 'truncate',
  span: 'text-brand',
  button:
    'w-36 h-9 shrink-0 bg-cyan-600 rounded-md text-base hover:cursor-pointer hover:bg-green-600 hover:transition-colors hover:duration-300',
};

export default class RoomInfo extends ContainerComponent {
  constructor({ roomName, currentCount, totalCount }: RoomInfoProps) {
    super({ classes: styles.container });

    const textContainer = new ContainerComponent({
      classes: styles.textContainer,
    });

    const name = new TextComponent({ classes: styles.title, content: 'Room: ' });
    const spanName = new TextComponent({ tag: 'span', content: roomName, classes: styles.span });
    name.appendChildren([spanName]);

    const count = new TextComponent({
      content: 'Players: ',
    });
    const nowCount = new TextComponent({
      tag: 'span',
      content: currentCount,
      classes: styles.span,
    });
    const allCount = new TextComponent({
      tag: 'span',
      content: `/${totalCount}`,
      classes: styles.span,
    });
    count.appendChildren([nowCount, allCount]);

    textContainer.appendChildren([name, count]);

    const leaveButton = new ButtonComponent({
      classes: styles.button,
      content: 'Leave room',
    });

    this.appendChildren([textContainer, leaveButton]);
  }
}
