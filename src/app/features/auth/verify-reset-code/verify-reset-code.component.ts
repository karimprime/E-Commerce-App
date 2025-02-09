import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.scss'
})
export class VerifyResetCodeComponent {
  resetPassword() {
    throw new Error('Method not implemented.');
  }

  constructor(private authService: AuthService) { }
  private router = inject(Router);
  errorMessage: string = "";
  isLoading: boolean = false;
  showResetCodeInput: boolean = false;
  showPasswordFields: boolean = false;

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  });

  checkResetCode() {
    if (!this.resetCodeForm.valid) {
      this.errorMessage = "Please enter a valid 6-digit reset code.";
      return;
    }

    this.isLoading = true;

    this.authService.sendCheckCodeToAPI(this.resetCodeForm.value).subscribe({
      next: (res) => {
        console.log("API Response:", res);
        if (res.status === "Success") {
          this.router.navigate(['/reset-password']);
          console.log("Vialed Reset Code Done");
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("API Error:", err);
        this.errorMessage = err.error?.message || "Invalid reset code!";
        this.isLoading = false;
      }
    });
  }
}
