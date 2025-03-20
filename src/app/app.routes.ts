import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterCompanyComponent } from './components/registercompany/registercompany.component';
import { CreateCompanyAccountComponent } from './components/create-company-account/create-company-account.component';
import { EmpleoComponent } from './components/empleo/empleo.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { ForoComponent } from './components/foro/foro.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { EventosComponent } from './components/eventos/eventos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página de inicio
  { path: 'registrate', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registercompany', component: RegisterCompanyComponent },
  { path: 'create-company-account', component: CreateCompanyAccountComponent },
  { path: 'empleo', component: EmpleoComponent },
  { path: 'transporte', component: TransporteComponent },
  { path: 'foro', component: ForoComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'eventos', component: EventosComponent }
];

