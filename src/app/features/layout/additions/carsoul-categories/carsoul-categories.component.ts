import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../../../core/services/ecommerce/categories/categories.service';
import { ICategory, ICategoriesResponse } from '../../../../shared/interface/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carsoul-categories',
  imports: [CarouselModule],
  templateUrl: './carsoul-categories.component.html',
  styleUrl: './carsoul-categories.component.scss'
})
export class CarsoulCategoriesComponent implements OnInit, OnDestroy {

  allCategories: ICategory[] = [];
  categorySub: Subscription = new Subscription();
  private categoriesService = inject(CategoriesService);

  sliderCategoriesOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 3000,
    autoplay: true,
    margin: 30,

    autoplayHoverPause: true,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      700: {
        items: 3
      },

      900: {
        items: 3
      },
      1080: {
        items: 5
      },
    },
    nav: true
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categorySub = this.categoriesService.getAllCategories().subscribe({
      next: (res: ICategoriesResponse) => {
        this.allCategories = res.data;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }
}
