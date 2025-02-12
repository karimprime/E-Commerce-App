import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from './../../../core/services/ecommerce/products/products.service';

import { IProduct } from '../../../shared/interface/products';
import { Subscription } from 'rxjs';
import { CarsoulHomeComponent } from '../../layout/additions/carsoul-home/carsoul-home.component';
import { ProductCardComponent } from '../../layout/additions/product-card/product-card.component';


@Component({
  selector: 'app-home',
  imports: [CarsoulHomeComponent , ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  allProducts: IProduct[] = [];
  ProductSub: Subscription = new Subscription();
  private productsService = inject(ProductsService);

  ngOnInit() {
    this.getAllProductHome();
  }

  getAllProductHome() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  ngOnDestroy() {
    this.ProductSub.unsubscribe();
  }
}

