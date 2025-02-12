import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService = inject(AuthService);

  constructor() { }

  private router = inject(Router);
  errorMessage: string = "";
  isLoading: boolean = false;

  loginSub: Subscription = new Subscription();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
  });

  passwordVisibility: Record<"password", boolean> = {
    password: false,
  };

  passwordChecks = {
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
    hasSpical: false
  };

  passwordFocused = false;

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  togglePasswordVisibility(inputEl: HTMLInputElement, field: "password"): void {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
    inputEl.type = this.passwordVisibility[field] ? 'text' : 'password';
  }

  updatePasswordStrength(): void {
    const password = this.passwordControl.value || "";
    this.passwordChecks = {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpical: /[@$!%*?&]/.test(password),
      hasMinLength: password.length >= 8
    };
  }

  LoginSubmit() {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.loginSub = this.authService.sendLoginToAPI(this.loginForm.value).subscribe({
        next: (res) => {
          if ('token' in res && res.message === "success") {  // Check if 'token' exists
            localStorage.setItem("userToken", res.token); // Set Token in LocalStorage
            this.authService.initializeUser();
            this.router.navigate(['/home']); // Navigate to Home Page
          } else {
            this.errorMessage = res.message || "An error occurred. Please try again.";
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message || "Login failed.";
          this.isLoading = false;
        }
      });
    }
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

}
