import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/Environment';
import { IProductResponse, IProduct } from '../../../../shared/interface/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpClient = inject(HttpClient);
  constructor() { }

  getAllProducts(page: number = 1): Observable<IProductResponse> {
    return this.httpClient.get<IProductResponse>(`${Env.baseApiUrl}/api/v1/products?page=${page}`);
  }
  getSpecProducts(pId: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${Env.baseApiUrl}/api/v1/products/${pId}`);
  }


}
