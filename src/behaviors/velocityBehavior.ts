import { MakeBehavior } from '../types';
import { getCollision } from '../utils/isColliding';

export const velocityBehavior: MakeBehavior =
  () => (obj, { width, height, objects }) => {
    obj.x += obj.velocity.x;
    obj.y += obj.velocity.y;

    // Limit movement
    obj.x = Math.min(Math.max(obj.x, 0), width - obj.width);
    obj.y = Math.min(obj.y, height - obj.height);

    // Stop acceleration after hitting wall
    if (obj.x === 0 || obj.x === width - obj.width) {
      obj.acceleration.x = 0;
      obj.velocity.x = 0;
    }

    const collision = getCollision(obj, objects);
    if (
      obj.velocity.y <= 0
      && collision
    ) {
      obj.acceleration.y = 0;
      obj.velocity.y = 0;
      obj.y = collision.y + obj.height;
    }
  }