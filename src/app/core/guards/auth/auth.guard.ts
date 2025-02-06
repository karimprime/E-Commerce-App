import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';  // Import isPlatformBrowser

export const authGuard: CanActivateFn = (route, state) => {
  // Inject dependencies
  let router = inject(Router);
  let platformId = inject(PLATFORM_ID);

  // Check if the platform is browser (avoid accessing localStorage in SSR)
  if (isPlatformBrowser(platformId)) {
    // If the user is authenticated, allow access
    if (localStorage.getItem('userToken') !== null) {
      return true;
    }
  }

  // If not authenticated, navigate to login page
  router.navigate(['/login']);
  return false;
};
