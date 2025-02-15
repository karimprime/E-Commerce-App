import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { headingInterceptor } from './core/interceptors/header/heading.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { provideToastr } from 'ngx-toastr';
import { successInterceptor } from './core/interceptors/success/success.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([headingInterceptor, errorsInterceptor, successInterceptor, loadingInterceptor])),
    importProvidersFrom(CarouselModule, NgxSpinnerModule), // ✅ Combine imports
    provideAnimations(),
    provideToastr({
      closeButton: false,
      positionClass: 'toast-below-navbar', // ✅ Ensure this CSS class is defined
      timeOut: 3000,
      progressBar: true,
    }),
  ]
};
