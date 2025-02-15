import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { APIResponseMessage } from '../../../shared/interface/data';

export const successInterceptor: HttpInterceptorFn = (req, next) => {
  let toastrService: ToastrService = inject(ToastrService);
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse && event.status === 200) {
        const responseBody = event.body as APIResponseMessage; // Explicitly type the response
        if (responseBody.message) {
          toastrService.success(responseBody.message, 'Success');
        }
      }
    })
  );
};
