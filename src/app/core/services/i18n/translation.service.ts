import { Injectable, Inject, PLATFORM_ID, inject, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLang: string = 'en';
  onLangChange: EventEmitter<string> = new EventEmitter<string>(); // Emit language change events

  private readonly translateService: TranslateService = inject(TranslateService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
      this.changeDir();
    }
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
      this.changeDir();
      this.onLangChange.emit(lang); // Emit language change event
    }
  }

  changeDir() {
    const savedLang = localStorage.getItem('lng');
    if (savedLang === 'en' || savedLang === 'de') {
      document.body.dir = 'ltr';
    } else if (savedLang === 'ar') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }

  // Add this method to get the current language
  getCurrentLang(): string {
    return this.translateService.currentLang || this.defaultLang;
  }
}
