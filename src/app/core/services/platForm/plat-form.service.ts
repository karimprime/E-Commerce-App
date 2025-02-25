import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatFormService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  checkPlatform(): string {
    return this.isBrowser ? 'Browser' : 'Server';
  }

  safeLocalStorageGet(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  safeLocalStorageSet(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  safeLocalStorageRemove(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}
