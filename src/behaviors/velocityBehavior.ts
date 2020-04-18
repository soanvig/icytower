import { Behavior } from '../types';

export const velocityBehavior: () => Behavior =
  () => (obj, { width, height }) => {
    obj.x += obj.velocity[0];
    obj.y += obj.velocity[1];

    // Limit movement
    obj.x = Math.min(Math.max(obj.x, 0), width - obj.width);
    obj.y = Math.min(Math.max(obj.y, 0), height - obj.height);
  }