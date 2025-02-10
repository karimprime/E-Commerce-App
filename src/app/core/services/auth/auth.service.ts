import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Env } from '../../Environment/Environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {


  private httpClient = inject(HttpClient);
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeUser();
  }

  initializeUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userToken = JSON.stringify(localStorage.getItem('userToken'));
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
    return this.httpClient.post(`${Env.baseApiUrl}/api/v1/auth/signup`, data);
  }

  sendLoginToAPI(data: object): Observable<any> {
    return this.httpClient.post(`${Env.baseApiUrl}/api/v1/auth/signin`, data);
  }

  sendResetCodeToAPI(data: object): Observable<any> {
    return this.httpClient.post(`${Env.baseApiUrl}/api/v1/auth/forgotPasswords`, data);
  }

  sendCheckCodeToAPI(data: object): Observable<any> {
    return this.httpClient.post(`${Env.baseApiUrl}/api/v1/auth/verifyResetCode`, data);
  }

  resetPasswordToAPI(data: { email: string; newPassword: string }): Observable<any> {
    return this.httpClient.put(`${Env.baseApiUrl}/api/v1/auth/resetPassword`, data);

  }

  saveUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const userToken = JSON.stringify(localStorage.getItem('userToken'));

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
