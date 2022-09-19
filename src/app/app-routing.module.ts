import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/pages/auth/auth.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  { 
    path: '', component: AuthComponent, children: [
      { path: '**', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'reg', component: RegisterComponent },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }