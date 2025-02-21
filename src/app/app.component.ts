import { Component, inject } from '@angular/core';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DashboardComponent } from "./features/layout/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  imports: [NgxSpinnerModule, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private flowbiteService = inject(FlowbiteService);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });
  }
}
