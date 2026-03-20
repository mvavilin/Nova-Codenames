import { BaseComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomItemProps } from './RoomItem.types';
import RoomUser from '../RoomUser/RoomUser';

const styles = {
  item: 'grid grid-cols-[1fr_3fr_2fr] items-center justify-center gap p-2 outline outline-white',
  indexNumber: 'text-center',
  role: 'text-center',
};

export default class RoomItem extends BaseComponent {
  constructor({ number, player }: RoomItemProps) {
    const isHeader = number === '№';
    const liStyles = isHeader ? `${styles.item} font-bold text-center` : styles.item;
    super({ tag: 'li', classes: liStyles });

    const indexNumber = new TextComponent({
      tag: 'span',
      classes: styles.indexNumber,
      content: number,
    });

    const user = player.userId
      ? new RoomUser({ username: player.username, userId: player.userId })
      : new RoomUser({ username: player.username });

    const role = new TextComponent({ tag: 'span', classes: styles.role, content: player.role });

    this.appendChildren([indexNumber, user, role]);
  }
}
