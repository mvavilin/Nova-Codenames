import type { ContainerComponentProperties } from '@/api/ComponentsAPI';
import type { Player } from '@shared/types/room';

export interface CommandSectionProps extends ContainerComponentProperties {
  commandName: string;
  players: Player[];
}
