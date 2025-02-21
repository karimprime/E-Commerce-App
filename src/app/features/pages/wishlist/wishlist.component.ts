import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IWishList } from '../../../shared/interface/wishlist';
import { WishListService } from '../../../core/services/ecommerce/wishList/wish-list.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistDetails = signal<IWishList[]>([]);
  private getWishlistSub?: Subscription;

  constructor(private wishListService: WishListService) { }

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

  ngOnDestroy(): void {
    this.getWishlistSub?.unsubscribe();
  }


}
