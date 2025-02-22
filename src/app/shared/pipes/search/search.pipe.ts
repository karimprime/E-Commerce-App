import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../interface/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(allProducts: IProduct[], searchWord: string): IProduct[] {
    if (!searchWord) return allProducts;
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(searchWord.toLowerCase())
    );
  }
}
