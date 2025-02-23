import { WishListService } from './../../../core/services/ecommerce/wishList/wish-list.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/ecommerce/products/products.service';
import { DataSpecProduct } from '../../../shared/interface/spec-product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/ecommerce/cart/cart.service';
import { BehaviorSubject, Subscription, take } from 'rxjs';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CommonModule, TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private subscriptions = new Subscription();

  isInWishlist$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  productid: string | null = null;
  pSpec!: DataSpecProduct;
  loading = true;
  errorMessage = '';

  sliderCategoriesOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 3000,
    autoplay: true,
    margin: 30,
    autoplayHoverPause: true,

    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      700: { items: 1 },
      900: { items: 1 },
      1080: { items: 1 },
    },
  };

  ngOnInit() {
    this.subscriptions.add(
      this.activatedRoute.paramMap.pipe(take(1)).subscribe((spId) => {
        this.productid = spId.get('id');

        if (this.productid) {
          this.fetchProductDetails(this.productid);
        } else {
          this.handleError('Invalid product ID.');
        }
      })
    );

    this.subscriptions.add(
      this.wishListService.wishlist$.subscribe(wishlist => {
        if (this.pSpec) {
          this.isInWishlist$.next(wishlist.some(product => product._id === this.pSpec._id));
        }
      })
    );
  }

  fetchProductDetails(productId: string) {
    this.subscriptions.add(
      this.productsService.getSpecProducts(productId).subscribe({
        next: (res) => {
          this.pSpec = res.data;
          this.loading = false;
          this.wishListService.wishlist$.pipe(take(1)).subscribe(wishlist => {
            this.isInWishlist$.next(wishlist.some(product => product._id === this.pSpec._id));
          });
        }
      })
    );
  }

  addToCart(id: string) {
    this.subscriptions.add(
      this.cartService.AddToCartAPI(id).subscribe({
        next: (res) => {
          console.log('Cart API Response:', res);
          this.cartService.cartNumber.next(res.numOfCartItems);
        }
      })
    );
  }

  toggleWishlist(productId: string) {
    if (productId) {
      this.isInWishlist$.getValue() ? this.removeFromWishlist(productId) : this.addToWishlist(productId);
    }
  }

  addToWishlist(productId: string) {
    if (productId) {
      this.subscriptions.add(
        this.wishListService.AddToWishListAPI(productId).subscribe(() => {
          this.isInWishlist$.next(true);
        })
      );
    }
  }

  removeFromWishlist(productId: string) {
    if (productId) {
      this.subscriptions.add(
        this.wishListService.DeleteItemFromWishListAPI(productId).subscribe(() => {
          this.isInWishlist$.next(false);
        })
      );
    }
  }

  private handleError(message: string) {
    this.errorMessage = message;
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
