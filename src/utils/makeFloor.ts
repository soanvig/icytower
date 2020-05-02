import { v4 } from 'uuid';
import { ObjectType, Floor } from '../types';
import { getRandomColor } from './getRandomColor';

export const makeFloor = (x: number, y: number, width: number, level: number): Floor => ({
  id: v4(),
  level,
  x,
  y,
  width,
  height: 50,
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0 },
  color: `#${getRandomColor()}`,
  behaviors: [],
  type: ObjectType.Floor,
});