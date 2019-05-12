import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthApiService, AuthService } from "../../services/auth";
import { IUser } from "../../models";
import { ILoginError } from "../../models/errors";
import { IAuthCredentials } from "../../models/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public credentials: IAuthCredentials;
  public disabled: boolean = false;
  public errors: ILoginError;
  public sub;

  constructor(
    private authApi: AuthApiService,
    private auth: AuthService,
    private router: Router
  ) {
    this.credentials = {
      login: '',
      password: ''
    }
  }

  public ngOnInit() {
    this.sub = this.auth.isLoggedIn$.subscribe((state: boolean) => {
      if (state) {
        this.router.navigate(['/']);
      }
    })
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public doLogin() {
    this.disabled = true;
    this.errors = null;
    this.authApi
      .loginApiCall(this.credentials.login, this.credentials.password)
      .subscribe(
        (employee: IUser) => {
          this.disabled = true;
          this.auth.emitLoggedIn(employee);
          this.router.navigate(['/']);
        },
        (response) => {
          this.disabled = false;
          if (response.error instanceof Object) {
            this.errors = response.error;
          }
        }
      );
  }


}
