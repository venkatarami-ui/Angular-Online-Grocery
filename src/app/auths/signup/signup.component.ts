import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  signUpForm:any;
  errorMessage:string = '';
  subscription?:Subscription;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), /*Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')*/]),
      confirmPassword: new FormControl(null, [Validators.required])
    });
  }

  passwordMatch(event:any){
    let password = this.signUpForm.value.password;
    let confirmPassword = ''
    confirmPassword += event.target.value;
    if(password !== confirmPassword){
      console.log(this.signUpForm.set('confirmPassword'));
      this.signUpForm.form.controls['confirmPassword'].setErrors({'matchField':false});
    }else{
      this.signUpForm.form.controls['confirmPassword'].setErrors({'matchField':true});
      console.log('matched');
    }
  }

  onSubmit(){
    let data = this.signUpForm.value;
    this.subscription = this.authService.signUp(data)
    .subscribe(
      (res:any) => {
        this.router.navigate(['/signin']);
      },
      (err) => {
        this.errorMessage = err.error.error.message;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
