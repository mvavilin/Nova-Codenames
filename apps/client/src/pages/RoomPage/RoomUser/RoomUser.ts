import { ContainerComponent, TextComponent } from '@/api/ComponentsAPI';
import type { RoomUserProps } from './RoomUser.types';
import { Avatar } from '@/components';

const styles = {
  container: 'w-[150px] flex items-center justify-center justify-self-center gap-4',
  userName: 'truncate flex-1',
};

export default class RoomUser extends ContainerComponent {
  constructor({ username, userId }: RoomUserProps) {
    super({ classes: styles.container });

    if (userId) {
      const avatar = new Avatar({ seed: userId });
      this.appendChildren([avatar]);
    }

    const name = new TextComponent({
      tag: 'span',
      classes: styles.userName,
      content: username,
    });

    this.appendChildren([name]);
  }
}
