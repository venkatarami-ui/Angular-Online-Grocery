import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { ErrorService } from 'src/app/Shared/Services/error.service';
// import { SignInResponse } from 'src/app/Shared/_interfaces/IUserSinInResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;
  error: any;
  errMsgs: any = this.errorService.errorMsgs;

  Form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // authObserve!: Observable<SignInResponse>

  onSubmit() {
    if (this.Form.valid) {
      // console.log(this.Form.value);

      if (this.isLoginMode) {
        //login
        this.authService.signIn(this.Form.value).subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['dashboard']);
          },
          (err) => {
            console.log(err);
            // this.error = err.error.error.message;
            this.error = this.errMsgs[err.error.error.message];
          }
        );
        this.Form.reset();
      } else {
        // sign up
        this.authService.signUp(this.Form.value).subscribe(
          (res) => {
            console.log(res);
            console.log('Registration Successful');
            this.onSwitchMode();
          },
          (err) => {
            console.log(err);

            this.error = this.errMsgs[err.error.error.message];
          }
        );
        this.Form.reset();
      }
    } else {
      console.log(`Please enter email & password!`);
    }
  }
}
