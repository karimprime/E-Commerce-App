import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shared/interface/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() productInfo !: IProduct;
}
