import { pipe } from 'rxjs';
import { scan, filter, map, pairwise } from 'rxjs/operators';

const frameSize = 120;
export const measureFps = () => pipe(
  scan(i => i + 1, 0),
  filter(i => i % frameSize === 0),
  map(_ => performance.now()),
  pairwise(),
  map(([lastTs, ts]) => {
    const avg = (ts - lastTs) / frameSize;
    return 1 / avg * 1000;
  })
);