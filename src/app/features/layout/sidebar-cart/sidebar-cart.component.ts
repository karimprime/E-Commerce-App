import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-cart',
  imports: [RouterLink],
  templateUrl: './sidebar-cart.component.html',
  styleUrl: './sidebar-cart.component.scss'
})
export class SidebarCartComponent {
  @ViewChild('drawerCart') drawerCart!: ElementRef;

  quantity: number = 1;

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  closeCart() {
    const cartDrawer = document.getElementById('drawer-cart');
    if (cartDrawer) {
      cartDrawer.classList.add('translate-x-full'); 
    }
  }
}
