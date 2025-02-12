import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ModeService } from '../../../core/services/mode/mode.service';
import { SidebarCartComponent } from "../additions/sidebar-cart/sidebar-cart.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, SidebarCartComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDarkMode = false;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  private authService = inject(AuthService);
  private router = inject(Router);
  private modeService = inject(ModeService);
  isLoginMode: boolean = false; // Ensure correct initialization

  constructor() {
    this.isDarkMode = this.modeService.isDarkMode();
  }

  toggleDarkMode(): void {
    this.modeService.toggleDarkMode();
    this.isDarkMode = !this.isDarkMode;
  }

  toggleMobileMenu() {
    this.mobileMenu?.nativeElement.classList.toggle('hidden');
  }

  closeMobileMenu() {
    if (this.mobileMenu?.nativeElement && !this.mobileMenu.nativeElement.classList.contains('hidden')) {
      this.mobileMenu.nativeElement.classList.add('hidden');
    }
  }

  ngOnInit(): void {
    this.authService.userData.subscribe((user) => {
      this.isLoginMode = !!user; // Simplified check
    });
  }

  logout() {
    this.authService.logout();
  }
}
