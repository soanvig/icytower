export type Behavior = <T extends GameObject>(obj: T, state: Readonly<GameState>) => void;

export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  behaviors: Behavior[];
}

export interface GameState {
  width: number;
  height: number;
  keys: number[];
  objects: GameObject[];
}