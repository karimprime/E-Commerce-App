import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Env } from '../../../Environment/Environment';
import { ICart } from '../../../../shared/interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private httpClient = inject(HttpClient);

  cartNumber: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor() {
    this.GetCartAPI().subscribe((res: ICart) => {
      this.cartNumber.next(res.numOfCartItems);
    });
  }
  // Add a product to the cart
  AddToCartAPI(pId: string): Observable<ICart> {
    return this.httpClient.post<ICart>(
      `${Env.baseApiUrl}/api/v1/cart`,
      { productId: pId }
    );
  }

  // Get the user's cart
  GetCartAPI(): Observable<ICart> {
    return this.httpClient.get<ICart>(
      `${Env.baseApiUrl}/api/v1/cart`
    );

  }

  // Update the quantity of a product in the cart
  UpdateCartAPI(pId: string, pcount: number): Observable<ICart> {
    return this.httpClient.put<ICart>(
      `${Env.baseApiUrl}/api/v1/cart/${pId}`,
      { count: pcount }
    );
  }

  // Remove a product from the cart
  DeleteItemFromCartAPI(pId: string): Observable<ICart> {
    return this.httpClient.delete<ICart>(
      `${Env.baseApiUrl}/api/v1/cart/${pId}`
    );
  }

  // Clear the entire cart
  ClearCartAPI(): Observable<any> {
    return this.httpClient.delete<ICart>(
      `${Env.baseApiUrl}/api/v1/cart`
    );
  }
}
