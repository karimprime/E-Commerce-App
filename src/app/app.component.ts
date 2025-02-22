import { Component, inject } from '@angular/core';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { NgxSpinnerModule, } from 'ngx-spinner';
import { DashboardComponent } from "./features/layout/dashboard/dashboard.component";


import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from './core/services/i18n/translation.service';
@Component({
  selector: 'app-root',
  imports: [NgxSpinnerModule, DashboardComponent, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly translationService: TranslationService = inject(TranslationService);
  private flowbiteService = inject(FlowbiteService);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  }

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }
}
