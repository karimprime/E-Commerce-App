import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlatFormService } from '../../services/platForm/plat-form.service';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);
  let platForm = inject(PlatFormService);

  if (platForm.checkPlatForm()) {
    if (localStorage.getItem('userToken') != null) {
      return true;
    }

  }
  router.navigate(['/login']);  // Navigate to login page if not authenticated
  return false;
};
