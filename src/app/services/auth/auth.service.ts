import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  private apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyDj2FJ4_M3iwioEC2gj2xGfRT2hFt5cVB0';
  private loggedIn:boolean = false;
  authEvent:any = new EventEmitter();

  isLoggedIn(){
    const authToken = localStorage.getItem('authToken');
    this.loggedIn = authToken ? true : false;
    this.authEvent.emit(this.loggedIn);
    return this.loggedIn;
  }

  signUp(data:any){
    return this.http.post(`${this.apiUrl}:signUp`, data, {params: {key: this.apiKey}})
    .pipe(
      catchError((err:any) => {
        throw err;
      }),
      map((res:any) => res)
    );
  }

  signIn(data:any){
    return this.http.post(`${this.apiUrl}:signInWithPassword`, data, {params: {key: this.apiKey}})
    .pipe(
      catchError((err:any) => {
        throw err;
      }),
      map((res:any) => res)
    );
  }

  signOut(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    this.authEvent.emit(false);
  }
}
