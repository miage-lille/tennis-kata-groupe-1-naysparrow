import { Player } from './types/player';
import {
  Score,
  PointsData,
  FortyData,
  Point,
  points,
  forty,
  game,
  deuce,
  advantage,
} from './types/score';

// Fonction pour incrémenter les points
const incrementPoint = (point: Point): Point => {
  switch (point.kind) {
    case 'LOVE':
      return { kind: 'FIFTEEN' };
    case 'FIFTEEN':
      return { kind: 'THIRTY' };
    default:
      return point;
  }
};

// Fonction pour vérifier si deux joueurs sont les mêmes
const isSamePlayer = (player1: Player, player2: Player): boolean => player1 === player2;

// Fonction pour obtenir l'autre joueur
export const otherPlayer = (player: Player): Player => (player === 'PLAYER_ONE' ? 'PLAYER_TWO' : 'PLAYER_ONE');

// Fonction pour convertir un joueur en chaîne de caractères
export const playerToString = (player: Player): string => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};

// Fonction principale score
export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'GAME':
      return scoreWhenGame(winner);
  }
};

// Fonction scoreWhenPoint
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const winnerPoint = current[winner];
  const loserPoint = current[otherPlayer(winner)];

  if (winnerPoint.kind === 'THIRTY') {
    return forty(winner, loserPoint);
  }

  return points({
    ...current,
    [winner]: incrementPoint(winnerPoint),
  });
};

// Fonction scoreWhenGame
export const scoreWhenGame = (winner: Player): Score => game(winner);

// Fonction scoreWhenDeuce
export const scoreWhenDeuce = (winner: Player): Score => advantage(winner);

// Fonction scoreWhenAdvantage
export const scoreWhenAdvantage = (advantagedPlayer: Player, winner: Player): Score => {
  if (isSamePlayer(advantagedPlayer, winner)) {
    return game(winner);
  }
  return deuce();
};

// Fonction scoreWhenForty 
export const scoreWhenForty = (currentForty: FortyData, winner: Player): Score => {
  if (isSamePlayer(currentForty.player, winner)) {
    return game(winner);
  }
  if (currentForty.otherPoint.kind === 'THIRTY') {
    return deuce();
  }
  return forty(currentForty.player, incrementPoint(currentForty.otherPoint));
};