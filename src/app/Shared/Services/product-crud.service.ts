import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductCrudService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // posting data to server

  postProduct(form: FormGroup) {
    return this.http.post<any>(`${this.url}`, form).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // getting data from server
  getProduct() {
    return this.http.get<any>(`${this.url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // edit/update the data
  updateProduct(form: any, k: any) {
    return this.http
      .put<any>(
        `https://newngdatabase-default-rtdb.firebaseio.com/products/${k}.json`,
        form
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  // delete the record
  deleteProduct(k: any) {
    return this.http.delete<any>(
      `https://newngdatabase-default-rtdb.firebaseio.com/products/${k}.json`
    );
    // .pipe(
    //   map((res) => {
    //     return res;
    //   })
    // );
  }
}
