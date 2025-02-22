import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Subscription, tap } from 'rxjs';
import { CartService } from '../../../core/services/ecommerce/cart/cart.service';
import { ICart } from '../../../shared/interface/cart';

import { TranslationService } from '../../../core/services/i18n/translation.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe , TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isCartOpen = signal(false);
  private readonly cartService = inject(CartService);
  private readonly translationService = inject(TranslationService);
  cartDetails = signal<ICart | null>(null);
  emptyCart: boolean = false;
  cartNumber!: number;

  getCartSub: Subscription = new Subscription();
  subscribeToCartNumberSub: Subscription = new Subscription();
  addToCartSub: Subscription = new Subscription();
  updateQuantitySub: Subscription = new Subscription();
  removeItemSub: Subscription = new Subscription();
  clearCartSub: Subscription = new Subscription();

  ngOnInit() {
    this.getCart();
    this.subscribeToCartNumber();
  }

  // Fetch cart data from the API
  getCart() {
    this.getCartSub = this.cartService.GetCartAPI()
      .pipe(tap((res) => console.log("API Res Get Cart", res)))
      .subscribe({
        next: (res) => {
          this.cartDetails.set(res); // Update cart details
          this.cartService.cartNumber.next(res.numOfCartItems);
        }
      });
  }

  // Subscribe to cart number updates
  subscribeToCartNumber() {
    this.cartService.cartNumber.subscribe({
      next: (res) => {
        this.subscribeToCartNumberSub = this.cartNumber = res;
      }
    });
  }

  // Add a product to the cart
  addToCart(id: string) {
    this.addToCartSub = this.cartService.AddToCartAPI(id).subscribe({
      next: (res) => {
        console.log('Cart API Response:', res);
        this.getCart();
      }
    });
  }

  // Update the quantity of a product in the cart
  updateQuantity(id: string, count: number) {
    if (count < 1) return; // Prevent negative values
    this.updateQuantitySub = this.cartService.UpdateCartAPI(id, count)
      .pipe(tap((res) => console.log("Updated Cart", res)))
      .subscribe({
        next: (res) => {
          this.cartDetails.set(res);
          this.cartService.cartNumber.next(res.numOfCartItems);
        }
      });
  }

  // Remove a product from the cart
  removeItem(id: string) {
    this.removeItemSub = this.removeItemSub = this.cartService.DeleteItemFromCartAPI(id)
      .pipe(tap((res) => console.log("Item Removed", res)))
      .subscribe({
        next: (res) => {
          this.cartDetails.set(res);
          this.cartService.cartNumber.next(res.numOfCartItems);
        }
      });
  }

  // Clear the entire cart
  clearCart() {
    this.clearCartSub = this.cartService.ClearCartAPI().subscribe({
      next: (res) => {
        console.log('Cart Cleared:', res);
        this.getCart();
      }
    });
  }

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }


  ngOnDestroy() {
    this.updateQuantitySub.unsubscribe();
    this.removeItemSub.unsubscribe();
    this.clearCartSub.unsubscribe();
  }

}
