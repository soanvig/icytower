export type Behavior = <T extends GameObject>(obj: T, state: Readonly<GameState>) => void;
export type MakeBehavior = (config: Config) => Behavior;

export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  behaviors: Behavior[];
  velocity: { x: number, y: number };
  acceleration: { x: number, y: number };
}

export interface GameState {
  width: number;
  height: number;
  keys: string[];
  objects: GameObject[];
}

export interface Config {
  horizontalAcceleration: number;
  horizontalMaxVelocity: number;
  verticalAcceleration: number;
  verticalMaxVelocity: number;
  friction: number;
}
