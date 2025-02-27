import { Component, ElementRef, inject, Renderer2, signal, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PasswordCheckLabelPipe } from '../../../shared/pipes/passwordCheckLabel/password-check-label.pipe';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, TranslatePipe, PasswordCheckLabelPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly renderer = inject(Renderer2);

  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef;
  private clickListener!: () => void;

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  passwordVisibility = signal<{ password: boolean }>({ password: false });
  RePasswordVisibility = signal<{ rePassword: boolean }>({ rePassword: false });
  passwordFocused = signal<boolean>(false);
  isOpen = signal(false);

  // Password Strength Checks using Signals
  passwordChecks = signal({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasMinLength: false,
    hasSpecial: false
  });

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(01)[0125][0-9]{8}$')]),
    agree: new FormControl(false, [Validators.requiredTrue])
  }, { validators: this.confirmPassword.bind(this) });

  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  togglePasswordVisibility(inputEl: HTMLInputElement, field: 'password'): void {
    this.passwordVisibility.set({ ...this.passwordVisibility(), [field]: !this.passwordVisibility()[field] });
    inputEl.type = this.passwordVisibility()[field] ? 'text' : 'password';
  }

  toggleRePasswordVisibility(inputEl: HTMLInputElement, field: 'rePassword'): void {
    this.RePasswordVisibility.set({ ...this.RePasswordVisibility(), [field]: !this.RePasswordVisibility()[field] });
    inputEl.type = this.RePasswordVisibility()[field] ? 'text' : 'password';
  }

  updatePasswordStrength(): void {
    const password = this.passwordControl.value || '';
    this.passwordChecks.set({
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[@$!%*?&]/.test(password),
      hasMinLength: password.length >= 8
    });
  }

  confirmPassword(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { misMatch: true };
  }

  handleOutsideClick = (event: Event) => {
    if (this.modalContent && this.modalContent.nativeElement && !this.modalContent.nativeElement.contains(event.target as Node)) {
      this.closeModal();
    }
  };

  addClickListener() {
    this.clickListener = this.renderer.listen('document', 'click', this.handleOutsideClick);
  }

  removeClickListener() {
    if (this.clickListener) {
      this.clickListener();
    }
  }

  openModal() {
    this.isOpen.set(true);
    this.addClickListener();
  }

  closeModal() {
    this.isOpen.set(false);
    this.removeClickListener();
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  get agreeControl(): FormControl {
    return this.registerForm.get('agree') as FormControl;
  }

  onAgreeChange() {
    this.agreeControl.markAsTouched();
    this.agreeControl.updateValueAndValidity();
  }

  RegisterSubmit() {
    this.isLoading.set(true);
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.authService.sendRegisterToAPI(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            this.router.navigate(['/auth/login']);
          }
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false)
      });
    } else {
      this.isLoading.set(false);
    }
  }

  translateDir(): boolean {
    return localStorage.getItem('lng') === 'ar';
  }
}
