import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ModeService } from '../../../core/services/mode/mode.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isDarkMode = false;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  private authService = inject(AuthService);
  private router = inject(Router);
  isLoginMode: boolean = true;

  constructor(private modeService: ModeService) {
    this.isDarkMode = this.modeService.isDarkMode();
  }

  toggleDarkMode(): void {
    this.modeService.toggleDarkMode();
    this.isDarkMode = !this.isDarkMode;
  }

  toggleMobileMenu() {
    if (this.mobileMenu) {
      this.mobileMenu.nativeElement.classList.toggle("hidden");
    }
  }

  closeMobileMenu() {
    if (this.mobileMenu && !this.mobileMenu.nativeElement.classList.contains("hidden")) {
      this.mobileMenu.nativeElement.classList.add("hidden");
    }
  }

  ngOnInit(): void {
    this.authService.userData.subscribe(() => {
      if (this.authService.userData.getValue() === null) {
        this.isLoginMode = false;
      }
      else {
        this.isLoginMode = true;
      }
    })
  }

  logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
    this.authService.userData.next(null);
  }
}
