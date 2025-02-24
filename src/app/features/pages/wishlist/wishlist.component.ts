import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IWishList } from '../../../shared/interface/wishlist';
import { WishListService } from '../../../core/services/ecommerce/wishList/wish-list.service';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../../core/services/ecommerce/cart/cart.service';
@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistDetails = signal<IWishList[]>([]);
  private getWishlistSub?: Subscription;

  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(): void {
    this.getWishlistSub = this.wishListService.GetWishListAPI()
      .pipe(tap(res => console.log("API Response: Wishlist", res)))
      .subscribe({
        next: (res: { data: IWishList[] }) => {
          this.wishlistDetails.update(() => res.data || []);
        },
        error: (err) => {
          console.error("Error fetching wishlist", err);
        }
      });
  }

  removeItem(itemId: string): void {
    this.wishListService.DeleteItemFromWishListAPI(itemId).subscribe({
      next: () => {
        this.wishlistDetails.update(() => this.wishlistDetails().filter(item => item._id !== itemId));
      },
    });
  }

  addToCart(id: string) {
    this.cartService.AddToCartAPI(id).subscribe({
      next: (res) => {
        console.log('Cart API Response:', res);
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  translateDir(): 'ltr' | 'rtl' {
    return document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
  }




  ngOnDestroy(): void {
    this.getWishlistSub?.unsubscribe();
  }


}
