import { GameState, ObjectType, Camera } from '../types';
import { isValueNearby } from '../utils/isValueNearby';

export const applyCamera = (state: GameState): GameState => {
  const player = state.objects.find(o => o.type === ObjectType.Player)!;
  const availableOffset = 100;

  let offsetY: number;

  if (isValueNearby(player.y, state.camera.y, availableOffset)) {
    offsetY = 0
  } else {
    const diff = Math.abs(player.y - state.camera.y) - availableOffset;
    const sign = player.y < state.camera.y ? -1 : 1;

    offsetY = diff * sign
  }


  const newCamera: Camera = {
    ...state.camera,
    offsetY,
    y: Math.min(state.camera.y + offsetY, state.camera.height / 2),
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
      y: obj.y - state.camera.y + state.camera.height / 2,
    }))
  }
}