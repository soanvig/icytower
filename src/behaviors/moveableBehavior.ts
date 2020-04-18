import { Behavior } from '../types';

export const moveableBehavior: () => Behavior = () => (obj, { keys }) => {
  if (keys.includes(37)) {
    obj.x -= 3;
  } else if (keys.includes(39)) {
    obj.x += 3;
  }
}