import { Behavior } from '../types';

export const velocityBehavior: () => Behavior =
  () => (obj, { width, height }) => {
    obj.x += obj.velocity.x;
    obj.y += obj.velocity.y;
    console.log(obj.acceleration);

    // Limit movement
    obj.x = Math.min(Math.max(obj.x, 0), width - obj.width);
    obj.y = Math.min(Math.max(obj.y, 0), height - obj.height);

    // Stop acceleration after hitting wall
    if (obj.x === 0 || obj.x === width - obj.width) {
      obj.acceleration.x = 0;
      obj.velocity.x = 0;
    }

    if (obj.y === 0 || obj.y === height - obj.height) {
      obj.acceleration.y = 0;
      obj.velocity.y = 0;
    }
  }