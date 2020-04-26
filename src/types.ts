export type Behavior = <T extends GameObject>(obj: T, state: Readonly<GameState>) => void;
export type MakeBehavior = (config: Config) => Behavior;

export enum ObjectType {
  Player = 'player',
  Other = 'other',
}

export interface GameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  behaviors: Behavior[];
  velocity: { x: number, y: number };
  acceleration: { x: number, y: number };
  type: ObjectType;
}

export interface GameState {
  width: number;
  height: number;
  keys: string[];
  objects: GameObject[];
  camera: { x: number; y: number; };
}

export interface Config {
  horizontalAcceleration: number;
  horizontalMaxVelocity: number;
  verticalAcceleration: number;
  verticalAccelerationHorizontalFactor: number;
  verticalMaxVelocity: number;
  friction: number;
  gravity: number;
}
