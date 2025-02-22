import { Component, HostListener, inject } from '@angular/core';
import { ModeService } from '../../../core/services/mode/mode.service';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../../core/services/i18n/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-navbar',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})
export class AuthNavbarComponent {


  private readonly translationService = inject(TranslationService);
  private readonly modeService = inject(ModeService);

  isDarkMode = this.modeService.isDarkMode();
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isLanguageDropdownOpen = false;
  isUserDropdownOpen = false;

  socialLinks = [
    { icon: 'fa-facebook', ariaLabel: 'Facebook' },
    { icon: 'fa-twitter', ariaLabel: 'Twitter' },
    { icon: 'fa-instagram', ariaLabel: 'Instagram' },
    { icon: 'fa-tiktok', ariaLabel: 'TikTok' },
    { icon: 'fa-linkedin', ariaLabel: 'LinkedIn' },
    { icon: 'fa-youtube', ariaLabel: 'YouTube' },
  ];

  constructor() { }

  toggleDarkMode(): void {
    this.modeService.toggleDarkMode();
    this.isDarkMode = !this.isDarkMode;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
    this.isUserDropdownOpen = false;
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    this.isLanguageDropdownOpen = false;
  }

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }

}
