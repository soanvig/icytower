import { createGame$ } from './engine/game';
import { GameState, ObjectType } from './types';
import { tap } from 'rxjs/operators';
import { measureFps } from './engine/fps';
import { moveableBehavior } from './behaviors/moveableBehavior';
import { velocityBehavior } from './behaviors/velocityBehavior';
import { accelerationBehavior } from './behaviors/accelerationBehavior';
import { frictionBehavior } from './behaviors/frictionBehavior';
import { config } from './config';
import { gravityBehavior } from './behaviors/gravityBehavior';

const initialState: GameState = {
  width: 1000,
  height: 1000,
  keys: [],
  objects: [
    {
      x: 100,
      y: 800,
      height: 50,
      width: 500,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      color: 'green',
      behaviors: [],
      type: ObjectType.Other,
    },
    {
      x: 200,
      y: 600,
      height: 50,
      width: 300,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      color: 'green',
      behaviors: [],
      type: ObjectType.Other,
    },
    {
      x: 150,
      y: 400,
      height: 50,
      width: 400,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      color: 'green',
      behaviors: [],
      type: ObjectType.Other,
    },
    {
      x: 0,
      y: 950,
      height: 50,
      width: 1000,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      color: 'green',
      behaviors: [],
      type: ObjectType.Other,
    },
    {
      x: 50,
      y: 50,
      height: 50,
      width: 50,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      color: '#000',
      behaviors: [
        moveableBehavior(config),
        accelerationBehavior(config),
        frictionBehavior(config),
        gravityBehavior(config),
        velocityBehavior(config),
      ],
      type: ObjectType.Player,
    },
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
  ctx.fillStyle = 'aliceblue';
  ctx.fillRect(0, 0, state.width, state.height);

  state.objects.forEach((object, i) => {
    ctx.fillStyle = object.color;
    ctx.fillRect(object.x, object.y, object.width, object.height);

    if (object.type === ObjectType.Player) {
      ctx.font = '16px sans-serif';
      ctx.fillText(`Velocity X: ${object.velocity.x}`, 10, 20);
      ctx.fillText(`Velocity Y: ${object.velocity.y}`, 10, 40);
      ctx.fillText(`Acceleration X: ${object.acceleration.x}`, 10, 60);
      ctx.fillText(`Acceleration Y: ${object.acceleration.y}`, 10, 80);
    }
  });
}

createGame$(initialState).pipe(
  tap({ next: render }),
  measureFps(),
).subscribe(fps => console.info(`FPS: ${fps.toFixed(2)}`));




