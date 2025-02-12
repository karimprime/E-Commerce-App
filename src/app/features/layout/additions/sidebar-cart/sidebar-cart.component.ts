import { Component, ViewChild, ElementRef, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-cart',
  imports: [RouterLink],
  templateUrl: './sidebar-cart.component.html',
  styleUrl: './sidebar-cart.component.scss',
})
export class SidebarCartComponent {
  @ViewChild('drawerCart', { static: true }) drawerCart!: ElementRef;

  isCartOpen = signal(false); // Using Angular Signal for reactivity
  quantity = signal(1);

  toggleCart() {
    this.isCartOpen.update((prev) => !prev);
  }

  increaseQuantity() {
    this.quantity.update((prev) => prev + 1);
  }

  decreaseQuantity() {
    this.quantity.update((prev) => (prev > 1 ? prev - 1 : prev));
  }

  closeCart() {
    this.isCartOpen.set(false);
  }
}
