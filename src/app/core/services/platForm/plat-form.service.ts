import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  initializeUser(): void {
    // Check if the platform is browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        // Initialize user based on the token
        console.log('User is authenticated');
      } else {
        console.log('User is not authenticated');
      }
    } else {
      // Handle SSR or non-browser environments if needed
      console.log('Running on the server or a non-browser platform');
    }
  }
}
