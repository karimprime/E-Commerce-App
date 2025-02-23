import { Component, EventEmitter, inject, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../../shared/interface/products';
import { CartService } from '../../../../core/services/ecommerce/cart/cart.service';
import { WishListService } from '../../../../core/services/ecommerce/wishList/wish-list.service';
import { BehaviorSubject, Subscription } from 'rxjs';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() productInfo!: IProduct;
  @Output() fireAddToCart: EventEmitter<string> = new EventEmitter();
  @Output() fireAddToWishlist: EventEmitter<string> = new EventEmitter();

  private readonly cartService: CartService = inject(CartService);
  private readonly wishListService: WishListService = inject(WishListService);


  isInWishlist$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private wishlistSubscription!: Subscription;

  ngOnInit() {
    // Subscribe to wishlist changes
    this.wishlistSubscription = this.wishListService.wishlist$.subscribe(wishlist => {
      this.isInWishlist$.next(wishlist.some(product => product._id === this.productInfo._id));
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.wishlistSubscription.unsubscribe();
  }

  handleAddToCart() {
    this.fireAddToCart.emit(this.productInfo._id);
  }

  toggleWishlist() {
    if (this.isInWishlist$.getValue()) {
      this.wishListService.DeleteItemFromWishListAPI(this.productInfo._id).subscribe(() => {
        this.wishListService.updateWishlist();
      });
    } else {
      this.wishListService.AddToWishListAPI(this.productInfo._id).subscribe(() => {
        this.wishListService.updateWishlist();
      });
    }
  }
}
