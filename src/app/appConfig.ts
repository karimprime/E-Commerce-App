import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { headingInterceptor } from './core/interceptors/header/heading.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { provideToastr } from 'ngx-toastr';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideClientHydration(withEventReplay()), provideHttpClient(withInterceptors([headingInterceptor, errorsInterceptor, loadingInterceptor]))
    , importProvidersFrom(CarouselModule), provideAnimations(), importProvidersFrom(NgxSpinnerModule), provideAnimations(), provideToastr({
      closeButton: false,
      positionClass: 'toast-below-navbar', // Custom class for positioning
      timeOut: 3000,
      progressBar: true,
    }),
  ]
};
