import { Component, inject, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../../../shared/interface/products';
import { CarsoulCategoriesComponent } from "../carsoul-categories/carsoul-categories.component";

import { TranslationService } from '../../../../core/services/i18n/translation.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-carsoul-home',
  imports: [CarouselModule, CarsoulCategoriesComponent, TranslatePipe],
  templateUrl: './carsoul-home.component.html',
  styleUrl: './carsoul-home.component.scss'
})
export class CarsoulHomeComponent {
  @Input({ required: true }) productList: IProduct[] = [];
  private readonly translationService = inject(TranslationService);


  sliderOptions: OwlOptions = {
    loop: true,

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

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }

}
