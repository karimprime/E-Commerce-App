import { Component, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslationService } from '../../../../core/services/i18n/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  userWord: WritableSignal<string> = signal("");

  private readonly translationService = inject(TranslationService);

  @Output() searchChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.userWord());
  }

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }

}
