import { expect, test, vi } from 'vitest';
import { CardCounts } from '../../../../packages/shared/src/types/game.ts';
import type { Player } from '../../../../packages/shared/src/types/room.ts';
import { v4 as uuid } from 'uuid';
import { Game } from '../rooms/game.ts';
import { SECOND_COUNT_FOR_ASK_CLUE } from '../../../../packages/shared/src/socketEvents.ts';

test('The game should create 25 cards', () => {
  const game = new Game('', 4);
  game.initial();

  const cards = game.getGameInfo('').cards;

  expect(cards).toHaveLength(CardCounts.ALL);
});

test('The spymaster sees the colors of the cards', () => {
  const game = new Game('', 4);

  const userId = uuid();
  const player: Player = { id: userId, username: 'username', team: 'red', role: 'spymaster' };
  game.addPlayer(player);

  game.initial();

  const cards = game.getGameInfo(userId).cards;
  const redCards = cards.filter((card) => card.color === 'red');
  const blueCards = cards.filter((card) => card.color === 'blue');
  const neutralCards = cards.filter((card) => card.color === 'neutral');
  const bombCards = cards.filter((card) => card.color === 'bomb');

  expect(cards).toHaveLength(CardCounts.ALL);
  expect(redCards).toHaveLength(CardCounts.RED);
  expect(blueCards).toHaveLength(CardCounts.BLUE);
  expect(neutralCards).toHaveLength(CardCounts.NEUTRAL);
  expect(bombCards).toHaveLength(CardCounts.BOMB);
});

test('The agent does not see the color of the cards', () => {
  const game = new Game('', 4);

  const userId = uuid();
  const player: Player = { id: userId, username: 'username', team: 'red', role: 'agent' };
  game.addPlayer(player);

  game.initial();

  const cards = game.getGameInfo(userId).cards;
  const unknownCards = cards.filter((card) => card.color === 'unknown');

  expect(cards).toHaveLength(CardCounts.ALL);
  expect(unknownCards).toHaveLength(CardCounts.ALL);
});

test('The askClue method should return the id of a spymaster', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const player: Player = { id: spymasterId, username: 'username', team: 'red', role: 'spymaster' };
  game.addPlayer(player);
  game.initial();
  const result = game.askClue(() => {});

  expect(result).toBe(spymasterId);
});

test('The askClue method should return undefined if there is no spymaster', () => {
  const game = new Game('', 4);
  const player: Player = { id: uuid(), username: 'username', team: 'red', role: 'agent' };
  game.addPlayer(player);
  game.initial();
  const result = game.askClue(() => {});
  expect(result).toBeUndefined();
});

test('The askClue method should set a timer for the clue', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const player: Player = { id: spymasterId, username: 'username', team: 'red', role: 'spymaster' };
  game.addPlayer(player);
  game.initial();
  game.askClue(() => {});

  expect(game['clueTimer']).not.toBeNull();
});

test('The askClue method should clear the timer after the time is up', () => {
  vi.useFakeTimers();
  const game = new Game('', 4);
  const spymasterId = uuid();
  const player: Player = { id: spymasterId, username: 'username', team: 'red', role: 'spymaster' };
  game.addPlayer(player);
  game.initial();
  game.askClue(() => {});
  expect(game['clueTimer']).not.toBeNull();

  vi.advanceTimersByTime(SECOND_COUNT_FOR_ASK_CLUE * 1000);
  expect(game['clueTimer']).toBeNull();
});

test('The giveClue method should return the clue and the agent ids', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const agentId1 = uuid();
  const agentId2 = uuid();
  const spymaster: Player = {
    id: spymasterId,
    username: 'spymaster',
    team: 'red',
    role: 'spymaster',
  };
  const agent1: Player = { id: agentId1, username: 'agent1', team: 'red', role: 'agent' };
  const agent2: Player = { id: agentId2, username: 'agent2', team: 'red', role: 'agent' };
  game.addPlayer(spymaster);
  game.addPlayer(agent1);
  game.addPlayer(agent2);
  game.initial();
  const clue = 'clue';
  const result = game.giveClue(spymasterId, clue);
  expect(result).toEqual({ clue, agentIds: [agentId1, agentId2] });
});

test('The giveClue method should return an error if the player is not a spymaster', () => {
  const game = new Game('', 4);
  const agentId = uuid();
  const agent: Player = { id: agentId, username: 'agent', team: 'red', role: 'agent' };
  game.addPlayer(agent);
  game.initial();
  const clue = 'clue';
  const result = game.giveClue(agentId, clue);
  expect(result).toEqual({ error: 'ACTION_IS_PROHIBITED' });
});

test('The giveClue method should return an error if the game phase is not clue', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const spymaster: Player = {
    id: spymasterId,
    username: 'spymaster',
    team: 'red',
    role: 'spymaster',
  };
  game.addPlayer(spymaster);
  game.initial();
  game['gamePhase'] = 'guess';
  const clue = 'clue';
  const result = game.giveClue(spymasterId, clue);
  expect(result).toEqual({ error: 'ACTION_IS_PROHIBITED' });
});

test('The giveClue method should clear the clue timer', () => {
  const game = new Game('', 4);
  const spymasterId = uuid();
  const spymaster: Player = {
    id: spymasterId,
    username: 'spymaster',
    team: 'red',
    role: 'spymaster',
  };
  game.addPlayer(spymaster);
  game.initial();
  game.askClue(() => {});
  expect(game['clueTimer']).not.toBeNull();
  const clue = 'clue';
  game.giveClue(spymasterId, clue);
  expect(game['clueTimer']).toBeNull();
});
