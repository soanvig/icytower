import { Config } from './types';

export const config: Config = {
  horizontalAcceleration: 1.75,
  horizontalMaxVelocity: 20,
  verticalAcceleration: 37,
  verticalAccelerationHorizontalFactor: 0.6,
  verticalMaxVelocity: 100,
  friction: 0.6,
  gravity: -2,
  cameraFreedom: { x: 1000, y: 200 },
  cameraFollowSpeed: { x: 0, y: 2 },
}