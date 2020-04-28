import { GameState, ObjectType, Camera, Config } from '../types';
import { isValueNearby } from '../utils/isValueNearby';

const computeOffset = ({ player, camera, freedom }: { player: number; camera: number; freedom: number }) => {
  let offset: number;

  if (isValueNearby(player, camera, freedom)) {
    offset = 0
  } else {
    const diff = Math.abs(player - camera) - freedom;
    const sign = player < camera ? -1 : 1;

    offset = diff * sign
  }

  return offset;
}

export const applyCamera = (state: GameState): GameState => {
  const player = state.objects.find(o => o.type === ObjectType.Player)!;

  const offsetX = computeOffset({
    player: player.x,
    camera: state.camera.x,
    freedom: state.config.cameraFreedom.x,
  });

  const offsetY = computeOffset({
    player: player.y,
    camera: state.camera.y,
    freedom: state.config.cameraFreedom.y,
  });

  const newCamera: Camera = {
    ...state.camera,
    // @TODO reconsider how camera movement should be limited
    // x: Math.min(state.camera.x + offsetX, state.camera.width / 2),
    // y: Math.min(state.camera.y + offsetY, state.camera.height / 2),
    x: state.camera.x + offsetX,
    y: state.camera.y + offsetY,
  }

  return {
    ...state,
    camera: newCamera,
  }
}

export const mapObjectsToCamera = (state: GameState): GameState => {
  return {
    ...state,
    objects: state.objects.map(obj => ({
      ...obj,
      x: obj.x - state.camera.x + state.camera.height / 2,
      y: obj.y - state.camera.y + state.camera.height / 2,
    }))
  }
}