import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  toggleBtn:string = 'Hide';
  toggleType:string = 'password';
  signInForm:any;
  errorMessage:string = '';
  subscription?:Subscription;

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  togglePassword(){
    if(this.toggleBtn === 'Show'){
      this.toggleBtn = 'Hide';
      this.toggleType = 'password';
    }else{
      this.toggleBtn = 'Show';
      this.toggleType = 'text';
    }
  }

  onSubmit(){
    let data = this.signInForm.value;
    this.subscription = this.authService.signIn(data)
    .subscribe(
      (res:any) => {
        let authToken = res.idToken || null;
        let authUser = res.email || 'anonymous';
        //console.log(authToken);
        if(authToken){
          localStorage.setItem('authToken',authToken);
          localStorage.setItem('authUser',authUser);
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        this.errorMessage = err.error.error.message;
      }
    );
  }

}
