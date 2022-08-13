import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSignUp } from '../_interfaces/IUserSignUp';
import { SignInResponse } from '../_interfaces/IUserSinInResponse';
import { User } from '../_interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  signUp_url: string = environment.signUp_url;
  signIn_url: string = environment.signIn_url;
  auth_key: string = environment.Auth_Api_key;

  constructor(private http: HttpClient, private router: Router) {}

  // Sign Up Method

  signUp(userData: UserSignUp) {
    return this.http
      .post<SignInResponse>(`${this.signUp_url}${this.auth_key}`, {
        ...userData,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          this.authenticatedUser(res.email, res.localId, res.idToken);
        })
      );
  }

  ///////////////////////////////////

  // login Method
  signIn(userData: UserSignUp) {
    return this.http
      .post<SignInResponse>(`${this.signIn_url}${this.auth_key}`, {
        ...userData,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          console.log('sign in response', res);
          this.authenticatedUser(res.email, res.localId, res.idToken);
        })
      );
  }

  autoLogin() {
    const data = localStorage.getItem('UserData');
    const userLogData = JSON.parse(data);

    console.log('just now user Data', userLogData);

    if (!userLogData) {
      return;
    }

    const loggedInUser = new User(
      userLogData.email,
      userLogData.id,
      userLogData.token
      // new Date(userLogData.tokenExpirationDate)
    );

    if (loggedInUser.token) {
      this.user.next(loggedInUser);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('UserData');
  }

  // authenticated user

  private authenticatedUser(email: string, userId: string, token: string) {
    // const expirationDate = new Date(new Date().getTime());
    const user = new User(email, userId, token);
    console.log('Expiration', user);

    this.user.next(user);

    localStorage.setItem('UserData', JSON.stringify(user));
  }
}
