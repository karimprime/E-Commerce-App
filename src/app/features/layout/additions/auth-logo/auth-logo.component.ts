import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationService } from '../../../../core/services/i18n/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-logo',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './auth-logo.component.html',
  styleUrl: './auth-logo.component.scss'
})
export class AuthLogoComponent {
  private readonly translationService = inject(TranslationService);

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }

}
