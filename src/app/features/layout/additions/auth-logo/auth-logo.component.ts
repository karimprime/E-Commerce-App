import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-logo',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './auth-logo.component.html',
  styleUrl: './auth-logo.component.scss'
})
export class AuthLogoComponent {

}
