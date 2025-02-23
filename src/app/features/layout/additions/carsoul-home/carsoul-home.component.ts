import { Component, inject, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../../../shared/interface/products';
import { CarsoulCategoriesComponent } from "../carsoul-categories/carsoul-categories.component";

import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-carsoul-home',
  imports: [CarouselModule, CarsoulCategoriesComponent, TranslatePipe],
  templateUrl: './carsoul-home.component.html',
  styleUrl: './carsoul-home.component.scss'
})
export class CarsoulHomeComponent {
  @Input({ required: true }) productList: IProduct[] = [];

  sliderOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 2000,
    autoplay: true,

    autoplayHoverPause: true,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}
