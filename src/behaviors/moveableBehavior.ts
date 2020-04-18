import { MakeBehavior } from '../types';

export const moveableBehavior: MakeBehavior =
  (config) => (obj, { keys, height }) => {
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

    if (keys.includes('Space') && (obj.y + obj.height) === height) {
      // velocity is set, because jump is momentary
      obj.velocity.y = -config.verticalAcceleration;
    }
  }