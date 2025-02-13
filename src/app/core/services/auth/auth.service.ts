import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Env } from '../../Environment/Environment';
import { Router } from '@angular/router';
import {
  RegisterData,
  LoginData,
  AuthRequestSuccess,
  APIResponseMessage,
  ForgetPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
  VerifyResetCodeRequestSuccess
} from '../../../shared/interface/data';
import { iJWT } from '../../../shared/interface/jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private userTokenKey = 'userToken'; // Key for localStorage
  userData: BehaviorSubject<iJWT | null> = new BehaviorSubject<iJWT | null>(null);

  constructor() {
    this.initializeUser();
  }

  /** Initializes the user session */
  initializeUser(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const token = this.getToken();
    if (token) {
      this.verifyToken().subscribe({
        next: () => this.updateUserData(token),
        error: () => this.logout(),
      });
    }
  }

  /** Retrieves JWT token from local storage */
  private getToken(): string | null {
    return localStorage.getItem(this.userTokenKey);
  }

  /** Updates user data from decoded JWT token */
  private updateUserData(token: string): void {
    try {
      const decodedToken: iJWT = jwtDecode<iJWT>(token);
      this.userData.next(decodedToken);

      // Store user details in localStorage
      localStorage.setItem('userName', decodedToken.name);
      localStorage.setItem('userRole', decodedToken.role);
    } catch (error) {
      console.error('Invalid token:', error);
      this.logout();
    }
  }

  /** Sends user registration request */
  sendRegisterToAPI(data: RegisterData): Observable<APIResponseMessage> {
    return this.httpClient.post<APIResponseMessage>(`${Env.baseApiUrl}/api/v1/auth/signup`, data).pipe(
      catchError((error) => of(error.error))
    );
  }

  /** Sends login request and handles authentication */
  sendLoginToAPI(data: LoginData): Observable<AuthRequestSuccess | APIResponseMessage> {
    return this.httpClient.post<AuthRequestSuccess>(`${Env.baseApiUrl}/api/v1/auth/signin`, data).pipe(
      catchError((error) => of(error.error))
    );
  }

  /** Sends forgot password request */
  sendResetCodeToAPI(data: ForgetPasswordRequest): Observable<APIResponseMessage> {
    return this.httpClient.post<APIResponseMessage>(`${Env.baseApiUrl}/api/v1/auth/forgotPasswords`, data);
  }

  /** Sends verification request for reset code */
  sendCheckCodeToAPI(data: VerifyResetCodeRequest): Observable<VerifyResetCodeRequestSuccess | APIResponseMessage> {
    return this.httpClient.post<VerifyResetCodeRequestSuccess | APIResponseMessage>(
      `${Env.baseApiUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  /** Sends reset password request */
  resetPasswordToAPI(data: ResetPasswordRequest): Observable<APIResponseMessage> {
    return this.httpClient.put<APIResponseMessage>(`${Env.baseApiUrl}/api/v1/auth/resetPassword`, data);
  }

  /** Verifies token validity */
  verifyToken(): Observable<any> {
    const token = this.getToken();
    if (!token) return of(null);

    const headers = new HttpHeaders({ token });
    return this.httpClient.get(`${Env.baseApiUrl}/api/v1/auth/verifyToken`, { headers }).pipe(
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  /** Logs out the user */
  logout(): void {
    localStorage.removeItem(this.userTokenKey);
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }
}
