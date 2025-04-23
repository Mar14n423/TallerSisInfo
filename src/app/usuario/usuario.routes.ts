import { Routes } from '@angular/router';

export const usuarioRoutes: Routes = [
  {
    path: 'registrate',
    loadComponent: () =>
      import('../components/VistaUsuario/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../components/VistaUsuario/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'empleo',
    loadComponent: () =>
      import('../components/VistaUsuario/empleo/empleo.component').then(m => m.EmpleoComponent)
  },
  {
    path: 'empleos/:id',
    loadComponent: () =>
      import('../components/VistaUsuario/detalle-trabajo/detalle-trabajo.component').then(m => m.DetalleTrabajoComponent)
  },
  {
    path: 'transporte',
    loadComponent: () =>
      import('../components/VistaUsuario/transporte/transporte.component').then(m => m.TransporteComponent)
  },
  {
    path: 'foro',
    loadComponent: () =>
      import('../components/VistaUsuario/foro/foro.component').then(m => m.ForoComponent)
  },
  {
    path: 'marketplace',
    loadComponent: () =>
      import('../components/VistaUsuario/marketplace/marketplace.component').then(m => m.MarketplaceComponent)
  },
  {
    path: 'eventos-usuario',
    loadComponent: () =>
      import('../components/VistaUsuario/eventos-usuario/eventos-usuario.component').then(m => m.EventosUsuarioComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../components/VistaUsuario/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
       path: 'trabajo/:id',
       loadComponent: () =>
         import('../components/VistaUsuario/detalle-trabajo/detalle-trabajo.component')
           .then(m => m.DetalleTrabajoComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('../components/VistaUsuario/home/home.component').then(m => m.HomeComponent)
  }
];
