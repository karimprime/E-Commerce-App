import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../../shared/interface/products';
import { CartService } from '../../../../core/services/ecommerce/cart/cart.service';
import { WishListService } from '../../../../core/services/ecommerce/wishList/wish-list.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() productInfo !: IProduct;

  @Output() fireAddToCart: EventEmitter<string> = new EventEmitter();

  private readonly cartService: CartService = inject(CartService);
  private readonly wishListService: WishListService = inject(WishListService);

  handleAddToCart(id: string) {
    this.fireAddToCart.emit(id);
  }

}
