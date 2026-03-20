import type { ContainerComponentProperties } from '@/api/ComponentsAPI';

export interface RoomInfoProps extends ContainerComponentProperties {
  roomName: string;
  currentCount: number;
  totalCount: number;
}
