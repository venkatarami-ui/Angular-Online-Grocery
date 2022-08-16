import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';

import { AddressComponent } from './Components/address/address.component';

import { ProductListComponent } from './Components/product-list/product-list.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { HeaderComponent } from './Components/header/header.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CartComponent } from './Components/cart/cart.component';

// import { BillComponent } from './Components/bill-1/bill.component';
import { AuthInterceptor } from './Shared/Interceptor/auth.interceptor';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SigninComponent } from './auths/signin/signin.component';
import { SignupComponent } from './auths/signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderConfirmComponent } from './Components/order-confirm/order-confirm.component';
// import { MyordersComponent } from './Components/myorders/myorders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductCardComponent,
    AddressComponent,
    ProductListComponent,
    SearchFilterPipe,
    HeaderComponent,
    DashboardComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    OrderConfirmComponent,
    // MyordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
