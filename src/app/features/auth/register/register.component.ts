import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  errorMessage: string = "";

  isLoading: boolean = false;

  registerSub: Subscription = new Subscription();

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(01)[0125][0-9]{8}$')]),
    agree: new FormControl(false, [Validators.requiredTrue])
  }, { validators: this.confirmPassword.bind(this) });

  passwordVisibility: Record<"password" | "repassword", boolean> = {
    password: false,
    repassword: false
  };

  passwordChecks = {
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
    hasspical: false
  };

  passwordFocused = false;

  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }


  togglePasswordVisibility(inputEl: HTMLInputElement, field: "password" | "repassword"): void {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
    inputEl.type = this.passwordVisibility[field] ? 'text' : 'password';
  }

  updatePasswordStrength(): void {
    const password = this.passwordControl.value || "";
    this.passwordChecks = {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasspical: /[@$!%*?&]/.test(password),
      hasMinLength: password.length >= 8
    };
  }

  confirmPassword(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    return password === rePassword ? null : { misMatch: true };
  }


  get agreeControl(): FormControl {
    return this.registerForm.get('agree') as FormControl;
  }
  onAgreeChange() {
    this.agreeControl.markAsTouched();
    this.agreeControl.updateValueAndValidity();
  }

  RegisterSubmit() {
    this.isLoading = true;
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.registerSub = this.authService.sendRegisterToAPI(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            this.router.navigate(['/login']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.registerSub.unsubscribe();
  }
}
