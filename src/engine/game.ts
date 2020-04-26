import { keys$ } from './keyboard';
import { buffer, map, filter, withLatestFrom, scan } from 'rxjs/operators';
import { frames$ } from './frames';
import { last, cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { GameState } from '../types';
import { applyCamera } from './camera';

const framedKeys$: Observable<string[]> = keys$.pipe(
  buffer(frames$), // some keys pressed in between frames may get lost
  map(bufferedKeys => last(bufferedKeys)),
  filter(Boolean) as any,
);

export const createGame$ = (initialState: GameState) => frames$.pipe(
  withLatestFrom(framedKeys$),
  scan((oldState, [_, keys]) => {
    const state = {
      ...oldState,
      keys,
    };

    const objects = state.objects.map(object => {
      return object.behaviors.reduce((obj, applyBehavior) => {
        const clonedObject = cloneDeep(obj);
        applyBehavior(clonedObject, state);

        return clonedObject;
      }, object);
    });

    const stateWithObjects = {
      ...state,
      objects,
    };

    const stateWithCamera = applyCamera(stateWithObjects);

    return stateWithCamera;
  }, initialState),
);