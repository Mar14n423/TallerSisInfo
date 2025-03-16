import { Routes } from '@angular/router';
import { CrearTuCuentaComponent } from './paginas/crear-tu-cuenta/crear-tu-cuenta.component';
import { IniciarSesionEmpresaComponent } from './paginas/iniciar-sesion-empresa/iniciar-sesion-empresa.component';
import { IniciarSesionNormalComponent } from './paginas/iniciar-sesion-normal/iniciar-sesion-normal.component';
import { IndexComponent } from './paginas/index/index.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },  // Página principal
  { path: 'crear-cuenta', component: CrearTuCuentaComponent },
  { path: 'iniciar-sesion-empresa', component: IniciarSesionEmpresaComponent },
  { path: 'iniciar-sesion-normal', component: IniciarSesionNormalComponent },
];
