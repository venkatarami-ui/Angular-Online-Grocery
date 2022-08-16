import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { GetProdDetailsService } from '../../Shared/Services/get-prod-details.service';
import { IProduct } from '../../Shared/_interfaces/Iproduct';
import { AuthService } from 'src/app/Shared/Services/auth.service';



@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent  implements OnInit {
  public products: IProduct[] = [];
  votes: number = 0;

  userLoggedIn = false;
  public totalItem: number = 0;


  constructor(
    private http: HttpClient,
    private getDetails: GetProdDetailsService,
    private cartService: CartService,
    private authService: AuthService
    
  ) {}

  ngOnInit(): void {

    this.authService.user.subscribe((res) => {
      if (res) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });

    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
    this.getDetails
      .getProductDetails()
      .pipe(
        map((response): IProduct[] => {
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              this.products.push({ ...response[key] });
            }
          }
          return this.products;
        })
      ).subscribe();
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
    
  }


  onIncrement(){
    // this.cartService.addToCart(item);
    this.votes += 1;
    alert(this.votes)
  }
   
  onDecrement(): void {
    this.votes -= 1;
    alert(this.votes)
  }

    
}
