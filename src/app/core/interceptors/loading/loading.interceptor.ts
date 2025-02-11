import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let ngxSpinnerService = inject(NgxSpinnerService);


  ngxSpinnerService.show();
  console.log("API Call Started - Showing Spinner");

  return next(req).pipe(
    finalize(() => {
      ngxSpinnerService.hide();
      console.log("API Call Finished - Hiding Spinner");
    })
  );
};


