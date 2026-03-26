import {
  CardCounts,
  type Card,
  type CardColor,
  type GameInfo,
} from '../../../../packages/shared/src/types/game.ts';
import type { Player } from '../../../../packages/shared/src/types/room.ts';
import jsonData from '../../../../packages/shared/src/question-bank.json' with { type: 'json' };
import { v4 as uuid } from 'uuid';

export class Game {
  private roomId: string;
  private redTeam: Player[] = [];
  private blueTeam: Player[] = [];
  private maxPlayers: number;
  private cards: Card[] = [];

  constructor(roomId: string, maxPlayers: number) {
    this.roomId = roomId;
    this.maxPlayers = maxPlayers;
  }

  public addPlayer(player: Player): void {
    if (player.team === 'red') this.redTeam.push(player);
    if (player.team === 'blue') this.blueTeam.push(player);
  }

  public getRoomId(): string {
    return this.roomId;
  }

  public isFull(): boolean {
    return this.redTeam.length + this.blueTeam.length >= this.maxPlayers;
  }

  public getGameInfo(): GameInfo {
    return {
      redTeam: this.redTeam,
      blueTeam: this.blueTeam,
      currentTeam: 'red',
      cards: this.cards,
    };
  }

  public getSpymasterIds(): string[] {
    return this.getAllPlayers()
      .filter((player) => player.role === 'spymaster')
      .map((player) => player.id);
  }

  public getAgentIds(): string[] {
    return this.getAllPlayers()
      .filter((player) => player.role === 'agent')
      .map((player) => player.id);
  }

  private getAllPlayers(): Player[] {
    return [...this.redTeam, ...this.blueTeam];
  }

  public getPlayerIds(): string[] {
    return this.getAllPlayers().map((player) => player.id);
  }

  public getPlayer(userId: string): Player | undefined {
    return this.getAllPlayers().find((player) => player.id === userId);
  }

  public removePlayer(userId: string): void {
    this.redTeam = this.redTeam.filter((player) => player.id !== userId);
    this.blueTeam = this.blueTeam.filter((player) => player.id !== userId);
  }

  public initial(): void {
    this.createCards();
  }

  private createCards(): void {
    const words = Object.keys(jsonData)
      .toSorted(() => Math.random() - 0.5)
      .slice(0, CardCounts.ALL);

    const colors: CardColor[] = [];
    for (let i = 0; i < CardCounts.RED; i++) colors.push('red');
    for (let i = 0; i < CardCounts.BLUE; i++) colors.push('blue');
    for (let i = 0; i < CardCounts.NEUTRAL; i++) colors.push('neutral');
    colors.push('bomb');
    colors.sort(() => Math.random() - 0.5);

    for (let i = 0; i < CardCounts.ALL; i++) {
      const word = words[i];
      const color = colors[i];
      if (word && color) {
        this.cards.push({ id: uuid(), word, color, status: 'hidden' });
      }
    }
  }

  public getCards(): Card[] {
    return this.cards;
  }
}
