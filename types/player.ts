export type Player = 'PLAYER_ONE' | 'PLAYER_TWO';
export const isSamePlayer = (p1: Player, p2: Player) => p1 === p2;

export const playerOne = (): Player => 'PLAYER_ONE';
export const playerTwo = (): Player => 'PLAYER_TWO';