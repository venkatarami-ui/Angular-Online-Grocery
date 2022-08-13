import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../_interfaces/Iproduct';

@Injectable({
  providedIn: 'root',
})
export class GetProdDetailsService {
  // private _url: string = "/assets/data/products.json";
  private _url: string =
    'https://newngdatabase-default-rtdb.firebaseio.com/products.json';

  constructor(private http: HttpClient) {}

  getProductDetails(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this._url);
  }
}
