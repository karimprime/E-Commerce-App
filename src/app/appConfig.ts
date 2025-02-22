import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
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
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation(), withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([
        headingInterceptor,
        errorsInterceptor,
        successInterceptor,
        loadingInterceptor,
      ])
    ),
    importProvidersFrom(CarouselModule, NgxSpinnerModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })),
    provideAnimations(),
    provideToastr({
      closeButton: false,
      positionClass: 'toast-below-navbar',
      timeOut: 3000,
      progressBar: true,
      preventDuplicates: false,
      extendedTimeOut: 1000,
    }),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
};
