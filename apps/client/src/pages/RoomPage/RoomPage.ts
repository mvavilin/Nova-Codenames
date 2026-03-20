import { ContainerComponent } from '@/api/ComponentsAPI';
import RoomHeader from './RoomHeader/RoomHeader';
import RoomInfo from './RoomInfo/RoomInfo';
import RoomCommandSection from './RoomCommandSection/RoomCommandSection';
import RoomChoosingUsers from './RoomChoosingUsers/RoomChoosingUsers';
import { red, blue, choosingUsers } from './roomMockData';

const styles = {
  pageContainer:
    'w-full h-full px-20 py-5 flex flex-col justify-between items-center gap-10 bg-[url(/src/assets/backgrounds/lobby-page-background.jpg)] bg-center bg-cover bg-no-repeat',
  main: 'w-full flex flex-col justify-between items-center gap-10',
  commandContainer: 'w-full flex justify-between items-center',
};
export default class RoomPage extends ContainerComponent {
  constructor() {
    super({
      tag: 'div',
      classes: styles.pageContainer,
    });

    this.render();
  }

  private render(): void {
    const main = new ContainerComponent({ tag: 'main', classes: styles.main });

    const commandContainer = new ContainerComponent({
      classes: styles.commandContainer,
    });
    commandContainer.appendChildren([
      new RoomCommandSection({ commandName: 'red', players: red }),
      new RoomCommandSection({ commandName: 'blue', players: blue }),
    ]);

    main.appendChildren([
      new RoomInfo({ roomName: 'js-users-11', currentCount: 8, totalCount: 8 }),
      commandContainer,
      new RoomChoosingUsers({ players: choosingUsers }),
    ]);

    this.appendChildren([new RoomHeader(), main]);
  }
}
