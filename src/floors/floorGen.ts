import { GameState, Floor, ObjectType, StateFunction } from '../types';
import { range, partition, random } from 'lodash';
import { makeFloor } from '../utils/makeFloor';

const floorGen = (state: GameState): GameState => {
  const player = state.objects.find(o => o.type === ObjectType.Player)!;
  const floors: Floor[] = state.objects.filter(o => o.type === ObjectType.Floor) as Floor[];

  const currentLevel = Math.floor(player.y / 100);

  const floorRange = range(currentLevel - 10, currentLevel + 10 + 1);
  const expectedFloors = floorRange.map(level => makeFloor(random(0, 500), level * 100, random(50, 500), level));

  const [generatedLevels, notGeneratedLevels] = partition(
    expectedFloors,
    expectedFloor => floors.find(floor => floor.level === expectedFloor.level),
  );

  return {
    ...state,
    objects: [
      ...floors,
      ...notGeneratedLevels,
      player,
    ]
  }
}

export const withFloorGen = (): StateFunction => floorGen;