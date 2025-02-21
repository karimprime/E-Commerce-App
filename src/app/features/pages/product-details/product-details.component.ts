import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/ecommerce/products/products.service';
import { DataSpecProduct } from '../../../shared/interface/spec-product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/ecommerce/cart/cart.service';
import { Subscription, take } from 'rxjs';

import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CommonModule, SlickCarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private subscriptions = new Subscription();

  productid: string | null = null;
  pSpec: DataSpecProduct | null = null;
  loading = true;
  errorMessage = '';



  sliderCategoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 2000,
    autoplay: true,
    margin: 30,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      700: { items: 1 },
      900: { items: 1 },
      1080: { items: 1 },
    },
    nav: true
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
  }

  fetchProductDetails(productId: string) {
    this.subscriptions.add(
      this.productsService.getSpecProducts(productId).subscribe({
        next: (res) => {
          this.pSpec = res.data;
          this.loading = false;
        },
        error: () => {
          this.handleError('Product not found.');
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
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
        }
      })
    );
  }

  private handleError(message: string) {
    this.errorMessage = message;
    this.loading = false;
    this.pSpec = null;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
