import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { UserResolver } from './components/main-menu/user.resolver';
import { AuthGuard } from './guards/auth.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MainMenuComponent,  resolve: { data: UserResolver}}
];
