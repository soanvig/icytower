import { Behavior } from '../types';

const speed = 5;
export const moveableBehavior: () => Behavior =
  () => (obj, { keys, width, height }) => {
    if (keys.includes('ArrowRight')) {
      obj.velocity[0] = speed;
    }

    if (keys.includes('ArrowLeft')) {
      obj.velocity[0] = -speed;
    }

    if (keys.includes('ArrowLeft') && keys.includes('ArrowRight')) {
      obj.velocity[0] = 0;
    }
  }