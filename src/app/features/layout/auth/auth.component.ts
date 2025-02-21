import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLogoComponent } from "../additions/auth-logo/auth-logo.component";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, AuthLogoComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
