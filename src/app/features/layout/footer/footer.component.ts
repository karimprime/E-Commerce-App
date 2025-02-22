import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../core/services/i18n/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  private readonly translationService = inject(TranslationService);

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }
}
