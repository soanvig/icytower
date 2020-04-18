import { fromEvent, merge } from 'rxjs';
import { map, distinct, scan, share } from 'rxjs/operators';
import { uniq } from 'lodash';

const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
  map(event => ({ down: event.code })),
  distinct(),
);

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
  map(event => ({ up: event.code })),
  distinct(),
);

type KeyEvent = { down: string } | { up: string };

export const keys$ = merge(keydown$, keyup$).pipe(
  scan<KeyEvent, string[]>((pressedKeys, event) => {
    if ('down' in event) {
      return uniq([...pressedKeys, event.down]);
    }

    if ('up' in event) {
      return pressedKeys.filter(k => k !== event.up);
    }

    return pressedKeys;
  }, []),
  share()
);
