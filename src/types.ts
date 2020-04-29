export type Behavior = <T extends GameObject>(obj: T, state: Readonly<GameState>) => void;
export type MakeBehavior = (config: Config) => Behavior;
export type StateFunction = (state: GameState) => GameState;

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

export interface Camera {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameState {
  config: Config;
  width: number;
  height: number;
  keys: string[];
  objects: GameObject[];
  camera: Camera;
}

export interface Config {
  horizontalAcceleration: number;
  horizontalMaxVelocity: number;
  verticalAcceleration: number;
  verticalAccelerationHorizontalFactor: number;
  verticalMaxVelocity: number;
  friction: number;
  gravity: number;
  cameraFreedom: { x: number; y: number; };
  cameraFollowSpeed: { x: number; y: number; };
}
