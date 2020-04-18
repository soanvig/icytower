import { createGame$ } from './engine/game';
import { GameState } from './types';
import { tap } from 'rxjs/operators';
import { measureFps } from './engine/fps';
import { moveableBehavior } from './behaviors/moveableBehavior';

const initialState: GameState = {
  width: 600,
  height: 600,
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

const createCanvas = () => document.createElement('canvas');
const appendElement = (el: HTMLElement) => document.body.appendChild(el);

const primaryCanvas = createCanvas();
primaryCanvas.setAttribute('width', `${initialState.width}px`);
primaryCanvas.setAttribute('height', `${initialState.height}px`);

appendElement(primaryCanvas);

const render = (state: GameState) => {
  const ctx = primaryCanvas.getContext('2d')!;
  ctx.clearRect(0, 0, state.width, state.height);

  state.objects.forEach(object => {
    ctx.fillStyle = object.color;
    ctx.fillRect(object.x, object.y, object.width, object.height);
  });
}

createGame$(initialState).pipe(
  tap(render),
  measureFps(),
).subscribe(fps => console.info(`FPS: ${fps.toFixed(2)}`));




