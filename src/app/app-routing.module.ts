import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as appComponents from './pages';
import { AuthGuardService } from "./services/auth";


export const appRoutes: Routes = [
  {
    path: '',
    component: appComponents.GamesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    component: appComponents.SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games/:id/edit',
    component: appComponents.GameEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games/add',
    component: appComponents.GameAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games/:id/constructor',
    component: appComponents.GameConstructorComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'formats',
    component: appComponents.FormatsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'about',
    component: appComponents.AboutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: appComponents.LoginComponent
  },
  {
    path: 'logout',
    component: appComponents.LogoutComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
