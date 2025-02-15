import { Component, inject, Input } from '@angular/core';
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
  @Input()
  productInfo !: IProduct;
  private cartService: CartService = inject(CartService);
  private wishListService: WishListService = inject(WishListService);

  addToCart(pId: string) {
    this.cartService.AddToCartAPI(pId).subscribe({
      next: (res) => {
        console.log('Cart API Response:', res);
      }
    });
  }

}
