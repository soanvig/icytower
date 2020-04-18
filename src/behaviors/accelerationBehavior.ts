import { MakeBehavior } from '../types';

export const accelerationBehavior: MakeBehavior =
  (config) => (obj) => {
    obj.velocity.x += obj.acceleration.x;
    obj.velocity.y += obj.acceleration.y;

    /** @TODO limit speed */
    obj.velocity.x = Math.sign(obj.velocity.x) * Math.min(Math.abs(obj.velocity.x), config.horizontalMaxVelocity);
    obj.velocity.y = Math.sign(obj.velocity.y) * Math.min(Math.abs(obj.velocity.y), config.verticalMaxVelocity);
  }