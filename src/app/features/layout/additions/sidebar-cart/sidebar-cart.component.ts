// sidebar-cart.component.ts
import { Component, ViewChild, ElementRef, Signal, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/ecommerce/cart/cart.service';
import { ICartProduct, ICartResponse } from '../../../../shared/interface/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe], // Import CurrencyPipe
  templateUrl: './sidebar-cart.component.html',
  styleUrls: ['./sidebar-cart.component.scss'],
})
export class SidebarCartComponent {
  @ViewChild('drawerCart', { static: true }) drawerCart!: ElementRef;

  isCartOpen = signal(false); // Using Angular Signal for reactivity
  private cartService: CartService = inject(CartService);
  cartProducts: ICartProduct[] = [];
  totalPrice: number = 0;
  ngOnInit() {
    this.getToCart();
  }

  // Fetch cart data
  getToCart() {
    this.cartService.GetCartAPI().subscribe((res: ICartResponse) => {
      this.cartProducts = res.data.products;
      this.totalPrice = res.data.totalCartPrice;
    });
  }

  // Add to cart
  addToCart(pId: string) {
    this.cartService.AddToCartAPI(pId).subscribe((res: ICartResponse) => {
      this.cartProducts = res.data.products;
    });
  }

  // Increase quantity
  increaseQuantity(cartItem: ICartProduct) {
    this.cartService.UpdateCartAPI(cartItem.product._id, cartItem.count + 1).subscribe((res: ICartResponse) => {
      cartItem.count++;
    });
  }

  // Decrease quantity
  decreaseQuantity(cartItem: ICartProduct) {
    if (cartItem.count > 1) {
      this.cartService.UpdateCartAPI(cartItem.product._id, cartItem.count - 1).subscribe((res: ICartResponse) => {
        cartItem.count--;
      });
    }
  }

  // Remove item from cart
  removeItem(cartItem: ICartProduct) {
    this.cartService.DeleteItemFromCartAPI(cartItem.product._id).subscribe((res: ICartResponse) => {
      this.cartProducts = this.cartProducts.filter((item) => item._id !== cartItem._id);
    });
  }

  // Clear the entire cart
  clearCart() {
    this.cartService.ClearCartAPI().subscribe((res: ICartResponse) => {
      this.cartProducts = []; // Empty the cart
    });
  }



  // Toggle cart visibility
  toggleCart() {
    this.isCartOpen.update((prev) => !prev);
  }

  // Close cart
  closeCart() {
    this.isCartOpen.set(false);
  }

}
