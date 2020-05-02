import { GameState, ObjectType, Camera, Config } from '../types';
import { isValueNearby } from '../utils/isValueNearby';

interface ComputeOffsetParams { player: number; camera: number; freedom: number; followSpeed: number; };
const computeOffset = ({ player, camera, freedom, followSpeed }: ComputeOffsetParams) => {
  let diff: number;

  if (isValueNearby(player, camera, freedom)) {
    // Tries to center camera at player, but with delay if it's in freedom
    diff = isValueNearby(player, camera, followSpeed) ? 0 : followSpeed;
  } else {
    diff = Math.abs(player - camera) - freedom;
  }

  const sign = player < camera ? -1 : 1;
  const offset = diff * sign;

  return offset;
}

export const applyCamera = (state: GameState): GameState => {
  const player = state.objects.find(o => o.type === ObjectType.Player)!;

  const offsetX = computeOffset({
    player: player.x,
    camera: state.camera.x,
    freedom: state.config.cameraFreedom.x,
    followSpeed: state.config.cameraFollowSpeed.x,
  });

  const offsetY = computeOffset({
    player: player.y,
    camera: state.camera.y,
    freedom: state.config.cameraFreedom.y,
    followSpeed: state.config.cameraFollowSpeed.y,
  });

  const newCamera: Camera = {
    ...state.camera,
    x: state.camera.x + offsetX,
    y: state.camera.y + offsetY,
  }

  return {
    ...state,
    camera: newCamera,
  }
}

export const applyCameraLimit = (state: GameState): GameState => {
  return {
    ...state,
    camera: {
      ...state.camera,
      // Limit camera so it doesn't go below screen lower edge
      // y: Math.min(state.camera.y, state.camera.height / 2),
    }
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