import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-dropdown',
  imports: [TranslatePipe , RouterLink],
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.scss'
})
export class UserDropdownComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  private userSub: Subscription;

  isUserDropdownOpen = false;
  isLoginMode = false;

  userName: string | null = null;

  constructor() {
    this.userSub = this.authService.userData.subscribe((user) => {
      this.isLoginMode = this.authService.isAuthenticated && !!user;
      this.userName = user ? user.name : null;
    });

    this.authService.verifyToken().subscribe({
      next: () => (this.isLoginMode = this.authService.isAuthenticated),
      error: () => {
        this.isLoginMode = false;
        this.userName = null;
      },
    });
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.dropdown-container')) {
      this.isUserDropdownOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.isUserDropdownOpen = false;
    this.userName = null;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
