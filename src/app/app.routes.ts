import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { ChatLayoutComponent } from './features/chat/chat-layout/chat-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', component: Login},
      {path: 'signup', component: Signup}
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'chat', component: ChatLayoutComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: 'login'}
];
