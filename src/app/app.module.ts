import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { LayoutModule } from '@angular/cdk/layout';
import * as materialModules from '@angular/material';

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import * as appComponents from './components';
import * as appPages from './pages';
import * as apiServices from './services/api';
import * as authServices from './services/auth';

@NgModule({
  declarations: [
    appComponents.AppComponent,
    appComponents.NavbarComponent,
    appComponents.GameFormComponent,
    appComponents.ErrorListComponent,

    appPages.HomeComponent,
    appPages.GamesComponent,
    appPages.AboutComponent,
    appPages.FormatsComponent,
    appPages.LoginComponent,
    appPages.GameEditComponent,
    appPages.GameConstructorComponent,
    appPages.GameAddComponent,
    appPages.LogoutComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    LayoutModule,

    HttpClientXsrfModule.withOptions({
      cookieName: environment.csrfCookieName,
      headerName: environment.csrfHeaderName,
    }),

    materialModules.MatButtonModule,
    materialModules.MatCheckboxModule,
    materialModules.MatToolbarModule,
    materialModules.MatSidenavModule,
    materialModules.MatIconModule,
    materialModules.MatListModule,
    materialModules.MatMenuModule,
    materialModules.MatGridListModule,
    materialModules.MatFormFieldModule,
    materialModules.MatCommonModule,
    materialModules.MatInputModule,

    AppRoutingModule,
  ],
  providers: [
    apiServices.GamesApiService,
    apiServices.LocationsApiService,
    apiServices.TransitionsApiService,

    authServices.AuthService,
    authServices.AuthGuardService,
    authServices.AuthApiService,
  ],
  bootstrap: [appComponents.AppComponent]
})
export class AppModule {
}
