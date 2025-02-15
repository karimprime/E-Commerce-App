import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/ecommerce/products/products.service';
import { DataSpecProduct } from '../../../shared/interface/spec-product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
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
    this.activatedRoute.paramMap.subscribe((spId) => {
      this.productid = spId.get('id');

      if (this.productid) {
        this.productsService.getSpecProducts(this.productid).subscribe({
          next: (res) => {
            this.pSpec = res.data;
            this.loading = false;
          },
          error: () => {
            this.errorMessage = 'Product not found.';
            this.loading = false;
            this.pSpec = null;
          }
        });
      } else {
        this.errorMessage = 'Invalid product ID.';
        this.loading = false;
        this.pSpec = null;
      }
    });
  }

}
