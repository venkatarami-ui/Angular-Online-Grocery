import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { CartService } from 'src/app/Shared/Services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false;
  public totalItem: number = 0;
  constructor(
    private authService: AuthService,
    private cartService: CartService
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
  }

  onLogOut() {
    this.authService.logOut();
  }


}
