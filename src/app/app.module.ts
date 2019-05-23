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
import { D3Service } from './services/d3.service';
import { ParserService } from "./services/parser.service";
import * as apiServices from './services/api';
import * as authServices from './services/auth';
import * as appDirectives from "./directives";

@NgModule({
  declarations: [
    appComponents.AppComponent,
    appComponents.NavbarComponent,
    appComponents.GameFormComponent,
    appComponents.ErrorListComponent,
    appComponents.NodeVisualComponent,
    appComponents.LinkVisualComponent,
    appComponents.GraphComponent,
    appComponents.NodePropertiesComponent,
    appComponents.LinkPropertiesComponent,
    appComponents.GameStateComponent,
    appComponents.StateFormPropertyComponent,

    appPages.SettingsComponent,
    appPages.GamesComponent,
    appPages.AboutComponent,
    appPages.FormatsComponent,
    appPages.LoginComponent,
    appPages.GameEditComponent,
    appPages.GameConstructorComponent,
    appPages.GameAddComponent,
    appPages.LogoutComponent,

    appDirectives.ZoomableDirective,
    appDirectives.DraggableDirective,
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
    materialModules.MatDialogModule,
    materialModules.MatRadioModule,

    AppRoutingModule,
  ],
  entryComponents: [
    appComponents.NodePropertiesComponent,
    appComponents.LinkPropertiesComponent,
    appComponents.StateFormPropertyComponent,
  ],
  providers: [
    apiServices.GamesApiService,
    apiServices.LocationsApiService,
    apiServices.TransitionsApiService,
    apiServices.ConfigApiService,

    D3Service,
    ParserService,

    authServices.AuthService,
    authServices.AuthGuardService,
    authServices.AuthApiService,
  ],
  bootstrap: [appComponents.AppComponent]
})
export class AppModule {
}
