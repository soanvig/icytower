import { MakeBehavior } from '../types';

export const frictionBehavior: MakeBehavior =
  (config) => (obj) => {
    obj.velocity.x -= Math.sign(obj.velocity.x) * config.friction;

    if (Math.abs(obj.velocity.x) < config.friction) {
      obj.velocity.x = 0;
    }
  }