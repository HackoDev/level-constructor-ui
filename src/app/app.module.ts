import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import * as appComponents from './components';
import * as appPages from './pages';
import { ParserService } from './services/parser.service';
import * as apiServices from './services/api';
import * as authServices from './services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSvgModule } from 'ngx-svg';
import { MatSliderModule } from '@angular/material/slider';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { TooltipModule } from '@swimlane/ngx-charts';


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
    LayoutModule,

    HttpClientXsrfModule.withOptions({
      cookieName: environment.csrfCookieName,
      headerName: environment.csrfHeaderName,
    }),

    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCommonModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,

    NgxSvgModule,
    NgxGraphModule,

    AppRoutingModule,
    MatSliderModule,
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
