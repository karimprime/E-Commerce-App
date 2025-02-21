import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private authService = inject(AuthService);

  constructor() { }

  private router = inject(Router);
  errorMessage: string = "";
  isLoading: boolean = false;
  showResetCodeInput: boolean = false;
  showPasswordFields: boolean = false;

  forgetSub: Subscription = new Subscription();

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });


  passwordResetForm: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required])
  });

  sendResetEmail() {
    if (!this.forgetPasswordForm.valid) {
      this.errorMessage = "Please enter a valid email address.";
      return;
    }

    this.isLoading = true;
    const email = this.forgetPasswordForm.get('email')?.value;

    // Store email in sessionStorage
    sessionStorage.setItem('resetEmail', email);

    this.forgetSub = this.authService.sendResetCodeToAPI({ email }).subscribe({
      next: (res) => {
        console.log("API Response:", res);
        if (res.statusMsg === "success") {
          this.router.navigate(['/auth/verify-reset-code']);
        }
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy() {
    this.forgetSub.unsubscribe();
  }
}
