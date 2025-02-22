import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../core/services/ecommerce/products/products.service';
import { IProduct } from '../../../shared/interface/products';
import { CartService } from '../../../core/services/ecommerce/cart/cart.service';
import { CarsoulHomeComponent } from '../../layout/additions/carsoul-home/carsoul-home.component';
import { ProductCardComponent } from '../../layout/additions/product-card/product-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarsoulHomeComponent, ProductCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  allProducts: IProduct[] = [];
  productSub: Subscription = new Subscription();

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  currentPage: number = 1;
  numProducts: number = 18;

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productSub.add(
      this.productsService.getAllProducts(this.currentPage, this.numProducts).subscribe({
        next: (res) => {
          this.allProducts = res.data;
          console.log(res);
        },
      })
    );
  }


  addToCart(id: string) {
    this.productSub.add(
      this.cartService.AddToCartAPI(id).subscribe({
        next: (res) => {
          console.log('Cart API Response:', res);
          this.cartService.cartNumber.next(res.numOfCartItems);
        },
      })
    );
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}
