import { ButtonComponent, ContainerComponent } from '@/api/ComponentsAPI';
import type { CommandButtonProps } from './RoomCommandButtons.types';

const styles = {
  container: 'flex flex-col items-center gap-5',
  containerRoleBtn: 'flex justify-center gap-5 flex-wrap',
  button:
    'w-40 h-9 shrink-0 whitespace-normal leading-tight text-base text-white text-center font-main font-bold rounded-md hover:cursor-pointer hover:bg-green-600/80 hover:transition-colors hover:duration-300',
  buttonRed: 'bg-red-500/80',
  buttonBlue: 'bg-blue-500/80',
};
export default class RoomCommandButtons extends ContainerComponent {
  constructor({ command }: CommandButtonProps) {
    const buttonColor = command === 'red' ? styles.buttonRed : styles.buttonBlue;
    const buttonStyle = `${styles.button} ${buttonColor}`;
    super({ classes: styles.container });

    const containerRoleButtons = new ContainerComponent({ classes: styles.containerRoleBtn });
    const spyButton = new ButtonComponent({ content: 'Play as Spymaster', classes: buttonStyle });
    const agentButton = new ButtonComponent({ content: 'Play as Agent', classes: buttonStyle });
    containerRoleButtons.appendChildren([spyButton, agentButton]);

    const leaveButton = new ButtonComponent({ content: 'Leave command', classes: buttonStyle });

    this.appendChildren([containerRoleButtons, leaveButton]);
  }
}
