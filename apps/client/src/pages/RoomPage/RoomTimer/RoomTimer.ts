import { ContainerComponent } from '@/api/ComponentsAPI';
import { Loader } from '@/components/ui';
import { Timer } from '@/pages/GamePage/components';
// import Overlay from '@/components/ui';

const styles = {
  container:
    'w-[512px] max-[640px]:w-[350px] flex flex-wrap justify-center min-[640px]:justify-between items-center gap-5 text-white text-2xl font-bold bg-white/25 px-4 py-4 rounded',
  textContainerRow: 'w-full flex gap-2 items-center',
  textContainerCol: 'flex flex-col self-center',
  span: 'text-brand truncate',
  button:
    'w-34 h-12 shrink-0 bg-cyan-600 rounded-md whitespace-normal leading-tight text-base hover:cursor-pointer hover:bg-green-600 hover:transition-colors hover:duration-300',
};

export default class RoomTimer extends ContainerComponent {
  private timer: Timer;
  private loader: Loader;

  constructor() {
    super({ classes: styles.container });
    this.timer = new Timer(15, true);
    this.loader = new Loader('Игра начнется через ${this.timer}');

    this.appendChildren([this.timer, this.loader]);
    this.loader.show();
  }
}
