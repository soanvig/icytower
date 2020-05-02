export const isValueNearby = (value: number, targetValue: number, threshold: number) =>
  value + Math.abs(threshold) >= targetValue && value - Math.abs(threshold) <= targetValue;