import { Player } from './player';

// Définition des types de points
export type Love = {
  kind: 'LOVE';
};

export type Fifteen = {
  kind: 'FIFTEEN';
};

export type Thirty = {
  kind: 'THIRTY';
};

export type Point = Love | Fifteen | Thirty;

export const love = (): Love => ({
  kind: 'LOVE',
});

export const fifteen = (): Fifteen => ({
  kind: 'FIFTEEN',
});

export const thirty = (): Thirty => ({
  kind: 'THIRTY',
});

// Définition des types de score
export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type FortyData = {
  player: Player;
  otherPoint: Point;
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export type Deuce = {
  kind: 'DEUCE';
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

export type Game = {
  kind: 'GAME';
  player: Player;
};

export type Score = Points | Forty | Deuce | Advantage | Game;

export const points = (pointsData: PointsData): Points => ({
  kind: 'POINTS',
  pointsData,
});

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: { player, otherPoint },
});

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

export const game = (player: Player): Game => ({
  kind: 'GAME',
  player,
});