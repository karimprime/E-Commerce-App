// cart.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Env } from '../../../Environment/Environment';
import { ICartResponse } from '../../../../shared/interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private httpClient = inject(HttpClient);

  // Add a product to the cart
  AddToCartAPI(pId: string): Observable<ICartResponse> {
    return this.httpClient.post<ICartResponse>(
      `${Env.baseApiUrl}/api/v1/cart`,
      { productId: pId }
    );
  }

  // Get the user's cart
  GetCartAPI(): Observable<ICartResponse> {
    return this.httpClient.get<ICartResponse>(
      `${Env.baseApiUrl}/api/v1/cart`
    );
  }

  // Update the quantity of a product in the cart
  UpdateCartAPI(pId: string, pcount: number): Observable<ICartResponse> {
    return this.httpClient.put<ICartResponse>(
      `${Env.baseApiUrl}/api/v1/cart/${pId}`,
      { count: pcount }
    );
  }

  // Remove a product from the cart
  DeleteItemFromCartAPI(pId: string): Observable<ICartResponse> {
    return this.httpClient.delete<ICartResponse>(
      `${Env.baseApiUrl}/api/v1/cart/${pId}`
    );
  }

  // Clear the entire cart
  ClearCartAPI(): Observable<ICartResponse> {
    return this.httpClient.delete<ICartResponse>(
      `${Env.baseApiUrl}/api/v1/cart`
    );
  }
}
