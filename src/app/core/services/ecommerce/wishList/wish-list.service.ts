import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Env } from '../../../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private httpClient = inject(HttpClient);
  private wishlist: any[] = [];
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    this.loadWishlist();
  }

  private loadWishlist() {
    this.GetWishListAPI().subscribe({
      next: (response) => {
        this.wishlist = response?.data || [];
        this.wishlistSubject.next(this.wishlist);
      },
      error: (err) => console.error("Error fetching wishlist:", err)
    });
  }

  updateWishlist() {
    this.GetWishListAPI().subscribe(response => {
      this.wishlist = response?.data || [];
      this.wishlistSubject.next(this.wishlist);
    });
  }

  AddToWishListAPI(pId: string): Observable<any> {
    return this.httpClient.post<any>(`${Env.baseApiUrl}/api/v1/wishlist`, { productId: pId }).pipe(
      tap(() => this.updateWishlist())
    );
  }

  GetWishListAPI(): Observable<any> {
    return this.httpClient.get<any>(`${Env.baseApiUrl}/api/v1/wishlist`);
  }

  DeleteItemFromWishListAPI(pId: string): Observable<any> {
    return this.httpClient.delete<any>(`${Env.baseApiUrl}/api/v1/wishlist/${pId}`).pipe(
      tap(() => this.updateWishlist())
    );
  }
}
