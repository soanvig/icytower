import { GameState, ObjectType } from '../types';

export const applyCamera = (state: GameState): GameState => {
  const player = state.objects.find(o => o.type === ObjectType.Player)!;

  const cameraFreedomY = state.height / 4;
  const worldCenterY = state.height / 2;
  const playerCenterY = player.y + player.height / 2;

  const cameraDiffY = state.camera.y - playerCenterY;
  const offsetY = Math.max(0, Math.abs(cameraDiffY) - cameraFreedomY);

  console.log(state.camera.y, cameraDiffY);

  const newCamera = {
    x: state.camera.x,
    y: state.camera.y + offsetY,
  }

  return {
    ...state,
    camera: newCamera,
    objects: state.objects.map(obj => ({
      ...obj,
      y: obj.y + newCamera.y,
    }))
  }
}