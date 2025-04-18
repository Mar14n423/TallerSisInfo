import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('../components/VistaAdmin/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '', 
        loadComponent: () =>
          import('../components/VistaAdmin/homeadmin/homeadmin.component').then(m => m.HomeadminComponent)
      },
      {
        path: 'dashboard',
        redirectTo: '', 
        pathMatch: 'full'
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('../components/VistaAdmin/usuarios/usuarios.component').then(m => m.UsuariosComponent)
      },
      {
        path: 'eventos',
        loadComponent: () =>
          import('../components/VistaAdmin/eventos/eventos.component').then(m => m.EventosComponent)
      }
    ]
  },
  {
    path: 'login-admin',
    loadComponent: () =>
      import('../components/VistaAdmin/login-admin/login-admin.component').then(m => m.LoginAdminComponent)
  }
];
