import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let ngxSpinnerService = inject(NgxSpinnerService);

  console.log("🔄 API Call Started - Showing Spinner");
  ngxSpinnerService.show();

  return next(req).pipe(
    finalize(() => {
      console.log("✅ API Call Finished - Hiding Spinner");
      ngxSpinnerService.hide();
    })
  );
};


