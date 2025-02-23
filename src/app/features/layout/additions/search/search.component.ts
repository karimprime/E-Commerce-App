import { Component, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  userWord: WritableSignal<string> = signal("");

  @Output() searchChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.userWord());
  }


}
