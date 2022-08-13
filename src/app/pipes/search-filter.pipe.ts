import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../Shared/_interfaces/Iproduct';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(products: IProduct[], searchValue: string): IProduct[] {
    if (!products || !searchValue) {
      return products;
    }
    return products.filter(
      (product) =>
        product.productName
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        product.category
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        product.price.toString().includes(searchValue) ||
        product.description
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
    );
  }
}
