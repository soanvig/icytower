import { keys$ } from './keyboard';
import { buffer, map, filter, withLatestFrom, scan } from 'rxjs/operators';
import { frames$ } from './frames';
import { last, cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { GameState } from '../types';
import { moveableBehavior } from '../behaviors/moveableBehavior';

const initialState: GameState = {
  keys: [],
  objects: [
    {
      x: 50,
      y: 50,
      height: 50,
      width: 50,
      color: '#000',
      behaviors: [
        moveableBehavior(),
      ],
    }
  ]
}

const framedKeys$: Observable<number[]> = keys$.pipe(
  buffer(frames$), // some keys pressed in between frames may get lost
  map(bufferedKeys => last(bufferedKeys)),
  filter(Boolean) as any,
);

export const game$ = frames$.pipe(
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

    return {
      ...state,
      objects,
    };
  }, initialState),
);