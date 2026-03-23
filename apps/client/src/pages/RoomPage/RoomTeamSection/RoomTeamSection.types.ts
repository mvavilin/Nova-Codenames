import type { ContainerComponentProperties } from '@/api/ComponentsAPI';
import type { Player } from '@shared/types/room';

export interface TeamSectionProps extends ContainerComponentProperties {
  teamName: string;
  players: Player[];
}
