import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http:HttpClient
  ) { }

  // apiUrl:string = 'https://angular-training-hcl-default-rtdb.asia-southeast1.firebasedatabase.app';
  apiUrl:string = 'https://newngdatabase-default-rtdb.asia-southeast1.firebasedatabase.app';

  getAllRequest(db:string){
    return this.http.get(`${this.apiUrl}/${db}.json`)
    .pipe(
      map(
        (res:any) => {
          let data:any = [];
          for(let id in res){
            if(res.hasOwnProperty(id)){
              data.push({...res[id], id});
            }
          }
          return data;
        }
      )
    );
  }

  getOneRequest(db:string, id:any){
    return this.http.get(`${this.apiUrl}/${db}/${id}.json`);
  }
  
  postRequest(db:string, data:any){
    return this.http.post(`${this.apiUrl}/${db}.json`, data);
  }

  putRequest(db:string, id:any, data:any){
    delete data.id;
    return this.http.put(`${this.apiUrl}/${db}/${id}.json`, data);
  }

  deleteRequest(db:string, id:any){
    return this.http.delete(`${this.apiUrl}/${db}/${id}.json`);
  }
}
