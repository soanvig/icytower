import { MakeBehavior } from '../types';

export const moveableBehavior: MakeBehavior =
  (config) => (obj, { keys }) => {
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
  }