import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: '**', redirectTo: 'login'},
];

export const environment = {
  apiUrl: 'https://localhost:7190/api',
};
