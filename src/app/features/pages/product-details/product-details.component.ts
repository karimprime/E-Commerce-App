import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/ecommerce/products/products.service';
import { IProduct } from '../../../shared/interface/products';


@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  productid: string | null = "";
  pSpec !: IProduct;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((pid) => {
      this.productid = pid.get('productId');
      this.productsService.getSpecProducts(this.productid).subscribe({
        next: (res) => {
          this.pSpec = res;
          console.log(this.pSpec);

        }
      })
    })
  }

}
