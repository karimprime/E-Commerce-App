import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // On App Initialization, check if the user is already logged in
  initializeUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        try {
          this.userData.next(jwtDecode(userToken));
        } catch (error) {
          console.error('Error decoding JWT token:', error);
        }
      }
    }
  }

  sendRegistertoAPI(data: object): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, data);
  }

  sendLogintoAPI(data: object): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, data);
  }

  saveDataUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        try {
          this.userData.next(jwtDecode(userToken));
        } catch (error) {
          console.error('Error decoding JWT token:', error);
        }
      }
    }
  }
}
