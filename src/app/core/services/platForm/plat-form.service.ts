import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatFormService {
  constructor(@Inject(PLATFORM_ID) private platFormId: object) { }

  checkPlatform() {
    return isPlatformBrowser(this.platFormId) ? 'Browser' : 'Server';
  }

  safeLocalStorageGet(key: string): string | null {
    return isPlatformBrowser(this.platFormId) ? localStorage.getItem(key) : null;
  }

  safeLocalStorageSet(key: string, value: string): void {
    if (isPlatformBrowser(this.platFormId)) {
      localStorage.setItem(key, value);
    }
  }

  safeLocalStorageRemove(key: string): void {
    if (isPlatformBrowser(this.platFormId)) {
      localStorage.removeItem(key);
    }
  }
}
