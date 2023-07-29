import { ReplaySubject } from 'rxjs';

export class DestroyCleanupSubject extends ReplaySubject<boolean> {
  constructor() {
    super(1);
  }

  cleanup() {
    this.next(true);
    this.complete();
  }
};
