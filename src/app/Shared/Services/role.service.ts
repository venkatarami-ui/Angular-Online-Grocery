import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '../_interfaces/IUserRole';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  userRoles: UserRole[] = [];
  constructor(private http: HttpClient) {}

  // get user data
  getUser() {
    return this.http
      .get<UserRole>(
        'https://newngdatabase-default-rtdb.firebaseio.com/users.json'
      )
      .subscribe((res) => {
        for (let key in res) {
          this.userRoles.push({ ...res[key] });
        }
        return this.userRoles;
      });
  }
}
