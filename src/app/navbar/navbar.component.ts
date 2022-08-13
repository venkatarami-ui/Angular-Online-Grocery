import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  auth?:boolean;
  user?:string|null;
  subscriptions?:Subscription;

  ngOnInit(): void {
    this.subscriptions = this.authService.authEvent
    .subscribe(
      (data:any) => {
        //console.log(data);
        if(data){
          this.auth = data;
          this.user = localStorage.getItem('authUser');
        }else{
          this.auth = false;
          this.user = 'Guest';
        }
      }
    );
    this.user = localStorage.getItem('authUser') || 'Guest';
  }

  signOut(){
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

}
