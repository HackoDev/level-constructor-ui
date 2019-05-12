import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { IUser, IAuthObject } from '../../models';
import { Observable } from "rxjs";

@Injectable()
export class AuthApiService {

  constructor(private client: HttpClient) {
  }

  public restoreSessionApiCall(): Observable<IAuthObject> {
    return this.client.get<IAuthObject>('/api/auth/restore-session')
      .pipe(map((data) => {
        return {
          is_authenticated: data.is_authenticated,
          user: data.user
        };
      }));
  }

  public loginApiCall(login: string, password: string) {
    const data = {
      login: login,
      password: password
    };
    return this.client.post('/api/auth/login/', data)
      .pipe(map((response: IUser) => {
        return response;
      }));
  }

  public logoutApiCall() {
    return this.client.post('/api/auth/logout/', null);
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return this.client.post('/api/auth/change_password/', {
      old_password: oldPassword,
      new_password: newPassword
    });
  }
}
