import { Behavior } from '../types';

export const accelerationBehavior: () => Behavior =
  () => (obj) => {
    obj.velocity.x += obj.acceleration.x;
    obj.velocity.y += obj.acceleration.y;

    /** @TODO limit speed */
    obj.velocity.x = Math.sign(obj.velocity.x) * Math.min(Math.abs(obj.velocity.x), 10);
    obj.velocity.y = Math.sign(obj.velocity.y) * Math.min(Math.abs(obj.velocity.y), 10);
  }