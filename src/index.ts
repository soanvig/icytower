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
import { isColliding } from './utils/isColliding';
import { makeFloor } from './utils/makeFloor';

const width = 1000;
const height = 1000;
const initialState: GameState = {
  width,
  height,
  keys: [],
  camera: { x: 500, y: 500, offsetX: 0, offsetY: 0, width, height },
  objects: [
    makeFloor(0, 900, 1000),
    makeFloor(100, 800, 1000),
    makeFloor(200, 700, 1000),
    makeFloor(300, 600, 1000),
    makeFloor(400, 500, 1000),
    makeFloor(500, 400, 1000),
    makeFloor(600, 300, 1000),
    makeFloor(700, 200, 1000),
    makeFloor(800, 100, 1000),
    makeFloor(900, 0, 1000),
    makeFloor(950, -100, 1000),
    {
      id: 'player',
      x: 475,
      y: 850,
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
  const player = state.objects.find(o => o.type === ObjectType.Player)!;
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
      ctx.fillText(`Is colliding?: ${isColliding(object, state.objects)}`, 10, 100);
      ctx.fillText(`Camera Y: ${state.camera.y}`, 10, 120);
      ctx.fillText(`Camera offset Y: ${state.camera.offsetY}`, 10, 140);
      ctx.fillText(`Player X: ${player.x}`, 10, 160);
      ctx.fillText(`Player Y: ${player.y}`, 10, 180);
    }
  });
}

createGame$(initialState).pipe(
  tap({ next: render }),
  measureFps(),
).subscribe(fps => console.info(`FPS: ${fps.toFixed(2)}`));




