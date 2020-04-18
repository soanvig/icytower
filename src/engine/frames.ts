import { share, distinct, scan } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

const ofFrames = () => new Observable<number>(observer => {
  const handler = () => {
    window.requestAnimationFrame(time => {
      observer.next(time / 1000);
      handler();
    })
  }

  handler();
});

const limitToFps = (fps: number) => pipe(
  scan<number, number>((prevTime, time) => {
    const delta = time - prevTime;
    return delta > 1 / fps ? time : prevTime;
  }, 0),
  distinct(),
)

export const frames$ = ofFrames().pipe(
  limitToFps(60),
  share(),
);
