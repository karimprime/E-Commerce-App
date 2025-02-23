import { Component, HostListener, inject } from '@angular/core';
import { ModeService } from '../../../core/services/mode/mode.service';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { BtnTranslateComponent } from "../additions/btn-translate/btn-translate.component";

@Component({
  selector: 'app-auth-navbar',
  imports: [RouterLink, TranslatePipe, CommonModule, BtnTranslateComponent],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss'
})
export class AuthNavbarComponent {

  private modeService = inject(ModeService);

  isDarkMode = this.modeService.isDarkMode();
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isUserDropdownOpen = false;
  isLoginMode = false;

  userName: string | null = null;
  cartNumber!: number;

  socialLinks = [
    { icon: 'fa-facebook', ariaLabel: 'Facebook' },
    { icon: 'fa-twitter', ariaLabel: 'Twitter' },
    { icon: 'fa-instagram', ariaLabel: 'Instagram' },
    { icon: 'fa-tiktok', ariaLabel: 'TikTok' },
    { icon: 'fa-linkedin', ariaLabel: 'LinkedIn' },
    { icon: 'fa-youtube', ariaLabel: 'YouTube' },
  ];

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


  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }
}
