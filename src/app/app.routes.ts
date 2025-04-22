import { Routes } from '@angular/router';
import { usuarioRoutes } from './usuario/usuario.routes';
import { adminRoutes } from './admin/admin.routes';
import { empresaRoutes } from './empresa/empresa.routes';
import { EmpleoComponent } from './components/VistaUsuario/empleo/empleo.component';
import { DetalleTrabajoComponent } from './components/VistaUsuario/detalle-trabajo/detalle-trabajo.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  ...usuarioRoutes,
  ...empresaRoutes,
  ...adminRoutes,
  {
    path: 'empleos',
    component: EmpleoComponent
  },
  {
    path: 'empleos/:id',
    component: DetalleTrabajoComponent
  }
];
