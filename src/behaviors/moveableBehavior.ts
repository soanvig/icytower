import { Behavior } from '../types';

const acceleration = 1;
export const moveableBehavior: () => Behavior =
  () => (obj, { keys }) => {
    if (keys.includes('ArrowRight')) {
      obj.acceleration.x = acceleration;
    }

    if (keys.includes('ArrowLeft')) {
      obj.acceleration.x = -acceleration;
    }

    if (keys.includes('ArrowLeft') && keys.includes('ArrowRight')) {
      obj.acceleration.x = 0;
    }
  }