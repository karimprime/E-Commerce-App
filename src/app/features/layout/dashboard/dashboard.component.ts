import { Component, inject, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ModeService } from '../../../core/services/mode/mode.service';
import { AuthNavbarComponent } from "../auth-navbar/auth-navbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, AuthNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private userSub: Subscription;

  private modeService = inject(ModeService);

  isDarkMode = this.modeService.isDarkMode();
  isLoginMode = false;
  userName: string | null = null;

  currentRoute: string = '';

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

    // Listen for route changes and update currentRoute
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
