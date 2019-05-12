import { Component, OnInit } from '@angular/core';
import { AuthApiService, AuthService } from "../../services/auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthService,
              private authApi: AuthApiService,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.auth.user) {
      this.router.navigate(['/login']);
    }
  }

  public logout() {
    this.authApi.logoutApiCall().subscribe(() => {
      this.auth.emitLoggedOut();
    });
  }


}
