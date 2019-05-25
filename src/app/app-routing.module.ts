import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as appPages from './pages';
import { AuthGuardService } from "./services/auth";


export const appRoutes: Routes = [
  {
    path: '',
    component: appPages.GamesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    component: appPages.SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'online-rules',
    component: appPages.OnlineRulesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games/:id/edit',
    component: appPages.GameEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games/add',
    component: appPages.GameAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games/:id/constructor',
    component: appPages.GameConstructorComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'formats',
    component: appPages.FormatsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'about',
    component: appPages.AboutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: appPages.LoginComponent
  },
  {
    path: 'logout',
    component: appPages.LogoutComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
