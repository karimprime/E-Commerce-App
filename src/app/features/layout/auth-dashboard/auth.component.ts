import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLogoComponent } from "../additions/auth-logo/auth-logo.component";
import { BtnTranslateComponent } from "../additions/btn-translate/btn-translate.component";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, AuthLogoComponent, BtnTranslateComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
