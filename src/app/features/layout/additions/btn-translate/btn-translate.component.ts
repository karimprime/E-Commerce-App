import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/i18n/translation.service';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-translate',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './btn-translate.component.html',
  styleUrl: './btn-translate.component.scss'
})
export class BtnTranslateComponent {


  private readonly translationService = inject(TranslationService);
  isLanguageDropdownOpen = false;
  isRTL: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.isRTL = this.translationService.getCurrentLang() === 'ar';

    this.translationService.onLangChange.subscribe((lang) => {
      this.isRTL = lang === 'ar';
    });
  }


  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  toggleUserDropdown() {
    this.isLanguageDropdownOpen = false;
  }

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
    this.isLanguageDropdownOpen = false;
  }

}
