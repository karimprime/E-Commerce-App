
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  sendRegistertoAPI(data: object): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, data);
  }

  sendLogintoAPI(data: object): Observable<any> {
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, data);
  }

  saveDataUser() {

    this.userData.next(jwtDecode(JSON.stringify(localStorage.getItem('userToken'))));

  }
}
