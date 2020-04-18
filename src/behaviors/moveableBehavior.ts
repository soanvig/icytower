import { Behavior } from '../types';

const speed = 5;
export const moveableBehavior: () => Behavior =
  () => (obj, { keys, width, height }) => {
    if (keys.includes(37)) {
      obj.x -= speed;
    }

    if (keys.includes(39)) {
      obj.x += speed;
    }

    obj.x = Math.min(Math.max(obj.x, 0), width - obj.width);
  }