import type { RoomInfo } from '@shared/types/room';

const choosingPlayers = [
  {
    userId: '555',
    username: 'Ameli',
    team: '',
    role: '',
  },
  {
    userId: '666',
    username: 'Rino',
    team: '',
    role: '',
  },
  {
    userId: '777',
    username: 'Sydni',
    team: '',
    role: '',
  },
  {
    userId: '888',
    username: 'Alex',
    team: '',
    role: '',
  },
];

const red = [
  {
    userId: '111',
    username: 'Aliceeeee',
    team: 'red',
    role: 'spymaster',
  },
  {
    userId: '222',
    username: 'Sam',
    team: 'red',
    role: 'agent',
  },
];

const blue = [
  {
    userId: '333',
    username: 'Nick',
    team: 'blue',
    role: 'agent',
  },
  {
    userId: '444',
    username: 'Mila',
    team: 'blue',
    role: 'agent',
  },
];

export const mockCurrentRoom: RoomInfo = {
  id: '111',
  name: 'js-room-123',
  maxPlayers: 8,
  playerCount: 8,
  redPlayers: red,
  bluePlayers: blue,
  choosingPlayers: choosingPlayers,
};
