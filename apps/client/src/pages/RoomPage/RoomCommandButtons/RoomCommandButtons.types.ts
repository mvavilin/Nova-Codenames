import type { ButtonComponentProperties } from '@/api/ComponentsAPI';

export interface CommandButtonProps extends ButtonComponentProperties {
  command: string;
}
