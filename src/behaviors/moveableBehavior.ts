import { MakeBehavior } from '../types';
import { isColliding } from '../utils/isColliding';

export const moveableBehavior: MakeBehavior =
  (config) => (obj, { keys, objects }) => {
    if (keys.includes('ArrowRight')) {
      obj.acceleration.x = config.horizontalAcceleration;
    }

    if (keys.includes('ArrowLeft')) {
      obj.acceleration.x = -config.horizontalAcceleration;
    }

    if (keys.includes('ArrowLeft') && keys.includes('ArrowRight')) {
      obj.acceleration.x = 0;
    }

    if (!keys.includes('ArrowLeft') && !keys.includes('ArrowRight')) {
      obj.acceleration.x = 0;
    }

    if (keys.includes('Space') && isColliding(obj, objects)) {
      // velocity is set, because jump is momentary
      const horizontalFactor = config.verticalAccelerationHorizontalFactor * Math.abs(obj.velocity.x);
      obj.velocity.y = config.verticalAcceleration + horizontalFactor;
    }
  }