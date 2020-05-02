import { keys$ } from './keyboard';
import { buffer, map, filter, withLatestFrom, scan } from 'rxjs/operators';
import { frames$ } from './frames';
import { last, cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { GameState, GameObject, Behavior, StateFunction } from '../types';
import { applyCamera, mapObjectsToCamera, applyCameraLimit } from './camera';
import { flow } from 'lodash';
import { withFloorGen } from '../floors/floorGen';

/**
 * Apply behavior to object.
 */
const makeReduceBehaviors = (state: GameState) => (obj: GameObject, applyBehavior: Behavior) => {
  const clonedObject = cloneDeep(obj);
  applyBehavior(clonedObject, state);

  return clonedObject;
}

/**
 * Keys gathered in time of frame
*/
const framedKeys$: Observable<string[]> = keys$.pipe(
  buffer(frames$), // some keys pressed in between frames may get lost
  map(bufferedKeys => last(bufferedKeys)),
  filter(Boolean) as any,
);

/**
 * Apply keys to state
 */
const withKeys = (keys: string[]): StateFunction => (state: GameState) => ({
  ...state,
  keys,
});

/**
 * Apply objects to state
 */
const withObjects = (): StateFunction => (state: GameState) => ({
  ...state,
  objects: state.objects.map(object => object.behaviors.reduce(makeReduceBehaviors(state), object)),
});

/**
 * Apply camera to state
 */
const withCamera = (): StateFunction => applyCamera;
const withCameraLimit = (): StateFunction => applyCameraLimit;

export const createGame$ = (initialState: GameState) => frames$.pipe(
  withLatestFrom(framedKeys$),
  scan((state, [_, keys]) => flow(
    withKeys(keys),
    withFloorGen(),
    withObjects(),
    withCamera(),
    withCameraLimit(),
  )(state), initialState),
  map(mapObjectsToCamera)
);