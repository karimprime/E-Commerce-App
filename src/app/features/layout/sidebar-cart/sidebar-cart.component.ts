import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-cart',
  imports: [RouterLink],
  templateUrl: './sidebar-cart.component.html',
  styleUrl: './sidebar-cart.component.scss'
})
export class SidebarCartComponent implements AfterViewInit {
  @ViewChild('drawerCart', { static: false }) drawerCart!: ElementRef;

  quantity: number = 1;

  ngAfterViewInit() {
    this.initializeCartDrawer();
  }

  initializeCartDrawer() {
    const cartDrawer = document.getElementById('drawer-cart');
    if (cartDrawer) {
      cartDrawer.classList.add('translate-x-full'); // Ensure it's closed by default
    }

    // Manually add event listeners again to ensure it works after login
    const cartButton = document.querySelector('[data-drawer-show="drawer-cart"]');
    if (cartButton && cartDrawer) {
      cartButton.addEventListener('click', () => {
        cartDrawer.classList.toggle('translate-x-full');
      });
    }
  }

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
