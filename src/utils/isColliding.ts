import { GameObject } from '../types';
import { isValueNearby } from './isValueNearby';

export const isColliding = (object: GameObject, allObjects: GameObject[]) => {
  const otherObjects = allObjects.filter(o => o !== object);
  const isColliding = otherObjects.some(
    other => (
      isValueNearby(object.y + object.height, other.y, Math.max(object.velocity.y, 1))
      && object.x + object.width >= other.x
      && object.x <= other.x + other.width
    )
  );

  return isColliding;
}