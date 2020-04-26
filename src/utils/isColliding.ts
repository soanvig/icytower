import { GameObject } from '../types';
import { isValueNearby } from './isValueNearby';

export const getCollision = (object: GameObject, allObjects: GameObject[]): GameObject | null => {
  const otherObjects = allObjects.filter(o => o.id !== object.id);
  const collidingObject = otherObjects.find(
    other => (
      isValueNearby(object.y + object.height, other.y, Math.max(object.velocity.y, 1))
      && object.x + object.width >= other.x
      && object.x <= other.x + other.width
    )
  );

  return collidingObject ?? null;
}

export const isColliding = (object: GameObject, allObjects: GameObject[]) => Boolean(getCollision(object, allObjects));