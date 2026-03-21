import { CardColor, CardStatus } from '@__mocks__';

export type Card = {
  id: string;
  word: string;
  color: CardColor;
  status: CardStatus;
  position: number;
  selected: boolean;
};
