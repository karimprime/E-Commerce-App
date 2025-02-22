import { Component, inject, WritableSignal, signal, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../layout/additions/product-card/product-card.component";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';
import { IProduct } from '../../../shared/interface/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../core/services/ecommerce/products/products.service';
import { CartService } from '../../../core/services/ecommerce/cart/cart.service';
import { SearchComponent } from "../../layout/additions/search/search.component";
import { PaginationComponent } from "../../layout/additions/pagination/pagination.component";

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, FormsModule, SearchPipe, SearchComponent, PaginationComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: IProduct[] = [];
  ProductSub: Subscription = new Subscription();
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  currentPage: number = 1;
  itemsPerPage: number = 18;
  searchQuery: WritableSignal<string> = signal("");

  ngOnInit() {
    this.getAllProducts();
  }

  addToCart(id: string) {
    this.cartService.AddToCartAPI(id).subscribe({
      next: (res) => {
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
      error: (err) => console.error(err),
    });
  }

  updateSearchQuery(value: string) {
    this.searchQuery.set(value);
    this.currentPage = 1;
  }

  get paginatedProducts(): IProduct[] {
    const filteredProducts = new SearchPipe().transform(this.allProducts, this.searchQuery());
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }


  get totalPages(): number {
    const filteredProducts = new SearchPipe().transform(this.allProducts, this.searchQuery());
    return Math.ceil(filteredProducts.length / this.itemsPerPage);
  }

  onPageChanged(newPage: number) {
    this.currentPage = newPage;
    console.log("Page changed to:", this.currentPage);
  }

  ngOnDestroy() {
    this.ProductSub.unsubscribe();
  }
}
