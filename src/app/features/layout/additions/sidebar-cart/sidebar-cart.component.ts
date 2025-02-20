import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/ecommerce/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ICart } from '../../../../shared/interface/cart';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sidebar-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './sidebar-cart.component.html',
  styleUrls: ['./sidebar-cart.component.scss'],
})
export class SidebarCartComponent implements OnInit {
  isCartOpen = signal(false);
  private readonly cartService = inject(CartService);
  cartDetails = signal<ICart | null>(null);
  emptyCart: boolean = false;
  cartNumber!: number;

  ngOnInit() {
    this.getCart();
    this.cartService.cartNumber.subscribe({
      next: (res) => {
        this.cartNumber = res;
      }
    })
  }

  // Fetch the cart data


  getCart() {
    this.cartService.GetCartAPI()
      .pipe(tap((res) => console.log("API Res Get Cart", res)))
      .subscribe((res) => {
        this.cartDetails.set(res)
        this.cartService.cartNumber.next(res.numOfCartItems);
      });
  }

  // Add to cart and refresh the cart state
  addToCart(id: string) {
    this.cartService.AddToCartAPI(id).subscribe({
      next: (res) => {
        console.log('Cart API Response:', res);
        this.getCart(); // Refresh the cart state
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      }
    });
  }

  // Update quantity and refresh the cart state
  updateQuantity(id: string, count: number) {
    if (count < 1) return; // Prevent negative values
    this.cartService.UpdateCartAPI(id, count)
      .pipe(tap((res) => console.log("Updated Cart", res)))
      .subscribe((res) => {
        this.cartDetails.set(res);
        this.cartService.cartNumber.next(res.numOfCartItems);
      }); // Refresh the cart state
  }

  // Remove item and refresh the cart state
  removeItem(id: string) {
    this.cartService.DeleteItemFromCartAPI(id)
      .pipe(tap((res) => console.log("Item Removed", res)))
      .subscribe((res) => {
        this.cartDetails.set(res)
        this.cartService.cartNumber.next(res.numOfCartItems);
      }); // Refresh the cart state
  }

  // Clear cart and refresh the cart state
  clearCart() {
    this.cartService.ClearCartAPI().subscribe({
      next:(res)=>{
        this.getCart();
      }
    })
  }

  // Toggle cart visibility
  toggleCart() {
    this.isCartOpen.update((prev) => !prev);
  }

  // Close the cart
  closeCart() {
    this.isCartOpen.set(false);
  }
}
