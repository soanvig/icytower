export const isValueNearby = (value: number, targetValue: number, threshold: number) =>
  value + threshold >= targetValue && value - threshold <= targetValue;