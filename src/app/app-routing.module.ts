import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './Components/address/address.component';
import { CartComponent } from './Components/cart/cart.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { AuthGuard } from './Shared/auth.guard';
import { SigninComponent } from '../app/auths/signin/signin.component';
import { SignupComponent } from '../app/auths/signup/signup.component';
import { MyordersComponent } from './Components/myorders/myorders.component';
import { OrderConfirmComponent } from './Components/order-confirm/order-confirm.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'cart', component: CartComponent},
  { path: 'myorders', component: MyordersComponent},
  { path: 'OrderConfirm', component: OrderConfirmComponent},
  { path: 'address', canActivate: [AuthGuard], component: AddressComponent },
  {
    path: 'product-list',
    canActivate: [AuthGuard],
    component: ProductListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
