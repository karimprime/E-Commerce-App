import { Component, inject, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModeService } from '../../../core/services/mode/mode.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/ecommerce/cart/cart.service';
import { CommonModule } from '@angular/common';

import { TranslatePipe } from '@ngx-translate/core';
import { BtnTranslateComponent } from "../additions/btn-translate/btn-translate.component";
import { UserDropdownComponent } from "../additions/user-dropdown/user-dropdown.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe, BtnTranslateComponent, UserDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private modeService = inject(ModeService);
  private cartService = inject(CartService);

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

  navLinks = [
    { route: '/home', text: 'Home' },
    { route: '/products', text: 'Products' },
    { route: '/categories', text: 'Categories' },
    { route: '/brands', text: 'Brands' },
  ];

  constructor() {

    this.authService.verifyToken().subscribe({
      next: () => (this.isLoginMode = this.authService.isAuthenticated),
      error: () => {
        this.isLoginMode = false;
        this.userName = null;
      },
    });

    this.cartService.cartNumber.subscribe((res) => {
      this.cartNumber = res;
    });
  }

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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.closeMobileMenu();
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }

}
