import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  constructor(private authService: AuthService) { }

  private router = inject(Router);
  errorMessage: string = "";
  isLoading: boolean = false;

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  vialedEmail() {

    this.isLoading = true;

    if (this.forgetPasswordForm.valid) {
      this.authService.sendLogintoAPI(this.forgetPasswordForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {

            this.router.navigate(['/home']); //Programming Routing [(src,Data)]
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message
          this.isLoading = false;
        }
      });
    }
  }

}
