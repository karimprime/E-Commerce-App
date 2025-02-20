
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from './../../../core/services/ecommerce/products/products.service';

import { IProduct } from '../../../shared/interface/products';
import { Subscription } from 'rxjs';
import { CarsoulHomeComponent } from '../../layout/additions/carsoul-home/carsoul-home.component';
import { ProductCardComponent } from '../../layout/additions/product-card/product-card.component';
import { CartService } from '../../../core/services/ecommerce/cart/cart.service';


@Component({
  selector: 'app-home',
  imports: [CarsoulHomeComponent, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allProducts: IProduct[] = [];
  ProductSub: Subscription = new Subscription();
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  currentPage: number = 1;
  totalPages: number = 2;

  ngOnInit() {
    this.getAllProductHome();
  }

  getAllProductHome() {
    this.productsService.getAllProducts(this.currentPage).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToCart(id: string) {
    this.cartService.AddToCartAPI(id).subscribe({
      next: (res) => {
        console.log('Cart API Response:', res);
        this.cartService.cartNumber.next(res.numOfCartItems);
      }
    })
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllProductHome();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllProductHome();
    }
  }

  ngOnDestroy() {
    this.ProductSub.unsubscribe();
  }
}

