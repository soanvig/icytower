import { game$ } from './engine/game';
import { GameState } from './types';
import { tap } from 'rxjs/operators';
import { measureFps } from './engine/fps';

const createCanvas = () => document.createElement('canvas');
const appendElement = (el: HTMLElement) => document.body.appendChild(el);

const primaryCanvas = createCanvas();
primaryCanvas.style.width = '600px';
primaryCanvas.style.height = '600px';

appendElement(primaryCanvas);

const render = (state: GameState) => {
  const ctx = primaryCanvas.getContext('2d')!;
  ctx.clearRect(0, 0, 600, 600);

  state.objects.forEach(object => {
    ctx.fillStyle = object.color;
    ctx.fillRect(object.x, object.y, object.width, object.height);
  });
}

game$.pipe(
  tap(render),
  measureFps(),
).subscribe(fps => console.info(`FPS: ${fps.toFixed(2)}`));




