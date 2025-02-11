import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shared/interface/products';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carsoul-home',
  imports: [CarouselModule],
  templateUrl: './carsoul-home.component.html',
  styleUrl: './carsoul-home.component.scss'
})
export class CarsoulHomeComponent {
  @Input({ required: true }) productList: IProduct[] = [];


  customOptionsFirstSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  customOptionsSecondSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
