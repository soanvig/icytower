import { game$ } from './engine/game';
import { GameState } from './types';

const createCanvas = () => document.createElement('canvas');
const appendElement = (el: HTMLElement) => document.body.appendChild(el);

const primaryCanvas = createCanvas();
primaryCanvas.style.width = '600px';
primaryCanvas.style.height = '600px';

appendElement(primaryCanvas);

const render = (state: GameState) => {
  const ctx = primaryCanvas.getContext('2d')!;
  ctx.clearRect(0, 0, 600, 600);

  ctx.fillStyle = state.player.color;
  ctx.fillRect(state.player.x, state.player.y, state.player.width, state.player.height);
}

game$.subscribe(render);




