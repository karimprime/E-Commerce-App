import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../../../../shared/interface/cart';
import { APIResponseMessage } from '../../../../shared/interface/data';
import { Env } from '../../../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private httpClient = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private userHeader: any = {};

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.userHeader.token = localStorage.getItem('userToken');
    }
  }

  AddToWishListAPI(pId: string): Observable<ICart | APIResponseMessage> {
    return this.httpClient.post<ICart | APIResponseMessage>(`${Env.baseApiUrl}/api/v1/wishlist`, { productId: pId }, {
      headers: this.userHeader
    });
  }

  GetFromWishListAPI(): Observable<ICart | APIResponseMessage> {
    return this.httpClient.get<ICart | APIResponseMessage>(`${Env.baseApiUrl}/api/v1/wishlist`, {
      headers: this.userHeader
    });
  }

  DeleteItemFromWishListAPI(pId: string): Observable<ICart | APIResponseMessage> {
    return this.httpClient.delete<ICart | APIResponseMessage>(`${Env.baseApiUrl}/api/v1/wishlist/${pId}`, {
      headers: this.userHeader
    });
  }
}
