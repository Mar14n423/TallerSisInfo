import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/registercompany/registercompany.component';
import { CreateCompanyAccountComponent } from './components/create-company-account/create-company-account.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página de inicio
  { path: 'registrate', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registercompany', component: RegisterCompanyComponent },
  { path: 'create-company-account', component: CreateCompanyAccountComponent }
];

