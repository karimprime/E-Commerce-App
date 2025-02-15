import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/Environment';
import { IProductResponse } from '../../../../shared/interface/products';
import { SpecProduct } from '../../../../shared/interface/spec-product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient);

  getAllProducts(page: number = 1): Observable<IProductResponse> {
    return this.httpClient.get<IProductResponse>(`${Env.baseApiUrl}/api/v1/products?page=${page}`);
  }

  getSpecProducts(spId: string | null): Observable<SpecProduct> {
    return this.httpClient.get<SpecProduct>(`${Env.baseApiUrl}/api/v1/products/${spId}`);
  }
}
