import { MakeBehavior } from '../types';

export const gravityBehavior: MakeBehavior =
  (config) => (obj) => {
    obj.velocity.y += config.gravity;
  }