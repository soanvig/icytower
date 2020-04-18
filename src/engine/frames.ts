import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';

const ofFrames = () => new Observable<number>(observer => {
  const handler = () => {
    window.requestAnimationFrame(time => {
      observer.next(time / 1000);
      handler();
    })
  }

  handler();
});

export const frames$ = ofFrames().pipe(
  share(),
);
