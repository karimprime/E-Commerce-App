// heading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PlatFormService } from '../../services/platForm/plat-form.service';

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const platformService = inject(PlatFormService);

  if (platformService.checkPlatform() === 'Browser') {
    const token = localStorage.getItem('userToken');
    if (token) {
      req = req.clone({
        setHeaders: { token }
      });
    }
  }
  return next(req);
};
