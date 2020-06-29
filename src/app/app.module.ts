import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { environment } from '@env';

import { NgxSvgModule } from 'ngx-svg';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { TooltipModule } from '@swimlane/ngx-charts';
import { MaterialModule } from '../material/app.module';

import { AppRoutingModule } from './app-routing.module';
import * as appComponents from './components';
import * as appPages from './pages';
import { ParserService } from './services/parser.service';
import * as apiServices from './services/api';
import * as authServices from './services/auth';


@NgModule({
  declarations: [
    appComponents.AppComponent,
    appComponents.NavbarComponent,
    appComponents.FooterComponent,
    appComponents.GameFormComponent,
    appComponents.ErrorListComponent,
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
    appPages.OnlineRulesComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    MaterialModule,

    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),

    NgxSvgModule,
    NgxGraphModule,
    AppRoutingModule,
    TooltipModule,
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

    ParserService,

    authServices.AuthService,
    authServices.AuthGuardService,
    authServices.AuthApiService,
  ],
  bootstrap: [appComponents.AppComponent]
})
export class AppModule {
}
