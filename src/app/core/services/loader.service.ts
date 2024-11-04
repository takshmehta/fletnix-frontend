import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingCount = 0;
  isLoading = new BehaviorSubject<boolean>(false);

  show() {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.isLoading.next(true);
    }
  }

  hide() {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    if (this.loadingCount === 0) {
      this.isLoading.next(false);
    }
  }
}
