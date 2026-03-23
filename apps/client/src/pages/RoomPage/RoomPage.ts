import { ContainerComponent } from '@/api/ComponentsAPI';
import RoomHeader from './RoomHeader/RoomHeader';
import RoomInfoBlock from './RoomInfoBlock/RoomInfoBlock';
import RoomTeamSection from './RoomTeamSection/RoomTeamSection';
import RoomChoosingPlayers from './RoomChoosingPlayers/RoomChoosingPlayers';
import store from '@/store/store';

const styles = {
  pageContainer:
    'w-full min-h-screen px-20 py-10 flex flex-col gap-10 items-center bg-[url(/src/assets/backgrounds/lobby-page-background.jpg)] bg-center bg-cover bg-no-repeat',
  main: 'w-full max-w-7xl flex-1 flex flex-col justify-start items-center gap-10',
  teamContainer:
    'w-full h-full flex flex-col min-[950px]:flex-row justify-center min-[950px]:justify-between items-center min-[950px]:items-start gap-10',
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
    const roomDate = store.getState().currentRoom;

    if (!roomDate) {
      //Loader
      return;
    }

    const main = new ContainerComponent({ tag: 'main', classes: styles.main });

    const teamContainer = new ContainerComponent({
      classes: styles.teamContainer,
    });
    teamContainer.appendChildren([
      new RoomTeamSection({ teamName: 'red', players: roomDate.redPlayers }),
      new RoomTeamSection({ teamName: 'blue', players: roomDate.bluePlayers }),
    ]);

    main.appendChildren([
      new RoomInfoBlock({
        roomName: roomDate.name,
        currentCount: roomDate.playerCount,
        totalCount: roomDate.maxPlayers,
      }),
      teamContainer,
      new RoomChoosingPlayers({ players: roomDate.choosingPlayers }),
    ]);

    this.appendChildren([new RoomHeader(), main]);
  }
}
