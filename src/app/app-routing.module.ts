import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { GamesComponent } from "./pages/games/games.component";
import { FormatsComponent } from "./pages/formats/formats.component";
import { AboutComponent } from "./pages/about/about.component";
import { GameEditComponent } from "./pages/game-edit/game-edit.component";
import { GameConstructorComponent } from "./pages/game-constructor/game-constructor.component";
import { GameAddComponent } from "./pages/game-add/game-add.component";
import { AuthGuardService } from "./services/auth";
import { LogoutComponent } from "./pages";


export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games',
    component: GamesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games/:id/edit',
    component: GameEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games/add',
    component: GameAddComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'games/:id/constructor',
    component: GameConstructorComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'formats',
    component: FormatsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
