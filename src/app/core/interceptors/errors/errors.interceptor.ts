import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  let toastrService: ToastrService = inject(ToastrService);
  return next(req).pipe(catchError((err) => {
    toastrService.error(err.error.message, "Error Message !");
    return throwError(() => err);
  }))
};
