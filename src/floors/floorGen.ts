import { GameState, Floor, ObjectType } from '../types';

const floorGen = (state: GameState): GameState => {
  const player = state.objects.find(o => o.type === ObjectType.Player)!;
  const floors: Floor[] = state.objects.filter(o => o.type === ObjectType.Floor) as Floor[];

  const floorLevels = floors.map(f => f.level);
  const currentLevel = Math.floor(Math.abs(player.y - 1000) / 100);

  return state;
}