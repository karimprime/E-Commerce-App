import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = 'https://ecommerce.routemisr.com';

  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

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

  sendRegisterToAPI(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseApiUrl}/api/v1/auth/signup`, data);
  }

  sendLoginToAPI(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseApiUrl}/api/v1/auth/signin`, data);
  }

  sendResetCodeToAPI(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseApiUrl}/api/v1/auth/forgotPasswords`, data);
  }

  sendCheckCodeToAPI(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseApiUrl}/api/v1/auth/verifyResetCode`, data);
  }

  resetPasswordToAPI(data: { email: string; newPassword: string }): Observable<any> {
    return this.httpClient.put(`${this.baseApiUrl}/api/v1/auth/resetPassword`, data);
  }

  saveUserData() {
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
