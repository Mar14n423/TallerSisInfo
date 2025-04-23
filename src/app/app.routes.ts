import { Routes } from '@angular/router';
import { usuarioRoutes } from './usuario/usuario.routes';
import { adminRoutes } from './admin/admin.routes';
import { empresaRoutes } from './empresa/empresa.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  ...usuarioRoutes,
  ...empresaRoutes,
  ...adminRoutes,
];
