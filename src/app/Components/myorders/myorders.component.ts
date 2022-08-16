import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Shared/Services/cart.service';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  public products: any = [];
  public grandTotal!: number;
  public totalItem: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.totalItem = res.length;
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCartItem();
  }
}
