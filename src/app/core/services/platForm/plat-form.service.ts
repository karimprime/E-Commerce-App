import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatFormService {

  constructor(@Inject(PLATFORM_ID) private platFormId: object) { }

  checkPlatForm(): boolean {
    if (isPlatformBrowser(this.platFormId)) {

      return true;
    }
    return false;
  }
}
