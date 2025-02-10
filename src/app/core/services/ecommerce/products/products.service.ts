import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/Environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpClient = inject(HttpClient);
  constructor() { }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${Env.baseApiUrl}/api/v1/products`)
  }

  getSpecProducts(pId: string): Observable<any> {
    return this.httpClient.get(`${Env.baseApiUrl}/api/v1/products/${pId}`)
  }
}
