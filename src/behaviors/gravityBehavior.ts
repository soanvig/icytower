import { MakeBehavior } from '../types';

export const gravityBehavior: MakeBehavior =
  (config) => (obj) => {
    obj.acceleration.y = config.gravity;
  }