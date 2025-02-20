import { ICart } from './../../../shared/interface/cart';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject, HostListener, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ModeService } from '../../../core/services/mode/mode.service';
import { SidebarCartComponent } from '../additions/sidebar-cart/sidebar-cart.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { navLink, socialLink } from '../../../shared/interface/nav-link';
import { CartService } from '../../../core/services/ecommerce/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private modeService = inject(ModeService);
  private userSub: Subscription;

  private cartService = inject(CartService);

  isDarkMode = this.modeService.isDarkMode();
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isLoginMode = false;
  userName: string | null = null;
  cartNumber!: number;
  socialLinks: socialLink[] = [
    { icon: 'fa-facebook', ariaLabel: 'Facebook' },
    { icon: 'fa-twitter', ariaLabel: 'Twitter' },
    { icon: 'fa-instagram', ariaLabel: 'Instagram' },
    { icon: 'fa-tiktok', ariaLabel: 'TikTok' },
    { icon: 'fa-linkedin', ariaLabel: 'LinkedIn' },
    { icon: 'fa-youtube', ariaLabel: 'YouTube' },
  ];

  navLinks: navLink[] = [
    { route: '/home', text: 'Home' },
    { route: '/products', text: 'Products' },
    { route: '/categories', text: 'Categories' },
    { route: '/brands', text: 'Brands' },
  ];

  constructor() {
    // Subscribe to user changes and update UI reactively
    this.userSub = this.authService.userData.subscribe((user) => {
      this.isLoginMode = this.authService.isAuthenticated && !!user;
      this.userName = user ? user.name : null; // Directly update from AuthService
    });


    // Verify token on initialization
    this.authService.verifyToken().subscribe({
      next: () => {
        this.isLoginMode = this.authService.isAuthenticated;
      },
      error: () => {
        this.isLoginMode = false;
        this.userName = null;
      },
    });

    this.cartService.cartNumber.subscribe({
      next: (res) => {
        this.cartNumber = res;
      }
    })
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
    this.router.navigate(['/login']);
    this.closeMobileMenu();
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
