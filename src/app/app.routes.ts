import { Routes } from '@angular/router';
import { HomeComponent } from './components/VistaUsuario/home/home.component';
import { RegisterComponent } from './components/VistaUsuario/register/register.component';
import { LoginComponent } from './components/VistaUsuario/login/login.component';
import { RegisterCompanyComponent } from './components/VistaEmpresa/registercompany/registercompany.component';
import { CreateCompanyAccountComponent } from './components/VistaEmpresa/create-company-account/create-company-account.component';
import { EmpleoComponent } from './components/VistaUsuario/empleo/empleo.component';
import { TransporteComponent } from './components/VistaUsuario/transporte/transporte.component';
import { ForoComponent } from './components/VistaUsuario/foro/foro.component';
import { MarketplaceComponent } from './components/VistaUsuario/marketplace/marketplace.component';
import { EventosComponent } from './components/VistaAdmin/eventos/eventos.component';
import { HomeadminComponent } from './components/VistaAdmin/homeadmin/homeadmin.component';
import { UsuariosComponent } from './components/VistaAdmin/usuarios/usuarios.component';
import { LoginAdminComponent } from './components/VistaAdmin/login-admin/login-admin.component';
import { EventosUsuarioComponent } from './components/VistaUsuario/eventos-usuario/eventos-usuario.component';



export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'registrate', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registercompany', component: RegisterCompanyComponent },
  { path: 'create-company-account', component: CreateCompanyAccountComponent },
  { path: 'empleo', component: EmpleoComponent },
  { path: 'transporte', component: TransporteComponent },
  { path: 'foro', component: ForoComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'admin', component: HomeadminComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'eventos-usuario', component: EventosUsuarioComponent},
];

