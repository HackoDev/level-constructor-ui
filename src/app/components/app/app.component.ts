import { Component, OnInit } from '@angular/core';
import { AuthApiService, AuthService } from "../../services/auth";
import { Router } from "@angular/router";
import { IAuthObject, IUser } from "../../models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private user: IUser = null;
  private loaded: boolean = false;

  constructor(
    private auth: AuthService,
    private authApi: AuthApiService,
    private router: Router,
  ) {
  }

  public ngOnInit() {
    // subscribe on login/logout actions
    this.auth.isLoggedIn$.subscribe((state: boolean) => {
      this.user = this.auth.user;
      if (!state) {
        this.doLoginRedirect();
      }
    });
    // restore sessions and check if user already logged in
    this.authApi.restoreSessionApiCall().subscribe(
      (data: IAuthObject) => {
        if (data.is_authenticated) {
          this.auth.emitLoggedIn(data.user);
        } else {
          this.auth.emitLoggedOut();
        }
        this.loaded = true;
      },
      (error) => {
        this.doLoginRedirect();
      }
    );
  }

  private doLoginRedirect() {
    this.router.navigate(['/login']);
  }

}
