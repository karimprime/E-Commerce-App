import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import {
  RegisterData,
  LoginData,
  AuthRequestSuccess,
  APIResponseMessage,
  ForgetPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
  VerifyResetCodeRequestSuccess,
} from '../../../shared/interface/data';
import { iJWT } from '../../../shared/interface/jwt';
import { PlatFormService } from '../platForm/plat-form.service';
import { Env } from '../../Environment/Environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private platformService = inject(PlatFormService);

  private userTokenKey = 'userToken';
  userData: BehaviorSubject<iJWT | null> = new BehaviorSubject<iJWT | null>(null);

  constructor() {
    this.initializeUser();
  }

  initializeUser(): void {
    if (this.platformService.checkPlatform() !== 'Browser') return;

    const token = this.getToken();
    if (token) {
      this.verifyToken().subscribe({
        next: () => this.updateUserData(token),
        error: () => this.logout(),
      });
    }
  }

  private getToken(): string | null {
    return this.platformService.safeLocalStorageGet(this.userTokenKey);
  }

  private updateUserData(token: string): void {
    try {
      const decodedToken: iJWT = jwtDecode<iJWT>(token);
      this.userData.next(decodedToken);

      if (this.platformService.checkPlatform() === 'Browser') {
        localStorage.setItem('userName', decodedToken.name);
        localStorage.setItem('userRole', decodedToken.role);
      }
    } catch (error) {
      console.error('Invalid token:', error);
      this.logout();
    }
  }

  sendRegisterToAPI(data: RegisterData): Observable<APIResponseMessage> {
    return this.httpClient.post<APIResponseMessage>(
      `${Env.baseApiUrl}/api/v1/auth/signup`,
      data
    ).pipe(catchError((error) => of(error.error)));
  }

  sendLoginToAPI(data: LoginData): Observable<AuthRequestSuccess | APIResponseMessage> {
    return this.httpClient.post<AuthRequestSuccess>(
      `${Env.baseApiUrl}/api/v1/auth/signin`,
      data
    ).pipe(
      tap((response) => {
        if (response.token) {
          this.platformService.safeLocalStorageSet(this.userTokenKey, response.token);
          this.updateUserData(response.token);
        }
      }),
      catchError((error) => of(error.error))
    );
  }

  sendResetCodeToAPI(data: ForgetPasswordRequest): Observable<APIResponseMessage> {
    return this.httpClient.post<APIResponseMessage>(
      `${Env.baseApiUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  sendCheckCodeToAPI(data: VerifyResetCodeRequest): Observable<VerifyResetCodeRequestSuccess | APIResponseMessage> {
    return this.httpClient.post<VerifyResetCodeRequestSuccess | APIResponseMessage>(
      `${Env.baseApiUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  resetPasswordToAPI(data: ResetPasswordRequest): Observable<APIResponseMessage> {
    return this.httpClient.put<APIResponseMessage>(
      `${Env.baseApiUrl}/api/v1/auth/resetPassword`,
      data
    );
  }

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

  logout(): void {
    this.platformService.safeLocalStorageRemove(this.userTokenKey);
    if (this.platformService.checkPlatform() === 'Browser') {
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
    }
    this.userData.next(null);
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    if (this.platformService.checkPlatform() !== 'Browser') return false;
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<iJWT>(token);
      const isTokenValid = Date.now() < decoded.exp * 1000;

      if (!isTokenValid) {
        this.logout(); // Log out if the token is expired
      }

      return isTokenValid;
    } catch {
      this.logout(); // Log out if the token is invalid
      return false;
    }
  }
}
