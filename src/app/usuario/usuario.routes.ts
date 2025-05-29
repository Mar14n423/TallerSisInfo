import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

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
      import('../components/VistaUsuario/empleo/empleo.component').then(m => m.EmpleoComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'empleos/:id',
    loadComponent: () =>
      import('../components/VistaUsuario/detalle-trabajo/detalle-trabajo.component').then(m => m.DetalleTrabajoComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'transporte',
    loadComponent: () =>
      import('../components/VistaUsuario/transporte/transporte.component').then(m => m.TransporteComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'foro',
    loadComponent: () =>
      import('../components/VistaUsuario/foro/foro.component').then(m => m.ForoComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'marketplace',
    loadComponent: () =>
      import('../components/VistaUsuario/marketplace/marketplace.component').then(m => m.MarketplaceComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'marketplace/mas-informacion',
    loadComponent: () =>
      import('../components/VistaUsuario/marketplace/mas-informacion/mas-informacion.component')
        .then(m => m.MasInformacionComponent)
  },
  {
    path: 'marketplace/carrito',
    loadComponent: () =>
      import('../components/VistaUsuario/marketplace/carrito/carrito.component')
        .then(m => m.CarritoComponent)
  },


  {
    path: 'marketplace/:id',
    loadComponent: () =>
      import('../components/VistaUsuario/detalle-marketplace/detalle-marketplace.component')
        .then(m => m.DetalleMarketplaceComponent)
  },
  {
    path: 'eventos-usuario',
    loadComponent: () =>
      import('../components/VistaUsuario/eventos-usuario/eventos-usuario.component').then(m => m.EventosUsuarioComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../components/VistaUsuario/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard],
  },
  {
       path: 'trabajo/:id',
       loadComponent: () =>
         import('../components/VistaUsuario/detalle-trabajo/detalle-trabajo.component')
           .then(m => m.DetalleTrabajoComponent),
           canActivate: [AuthGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('../components/VistaUsuario/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'delete-account',
    loadComponent: () =>
      import('../components/VistaUsuario/delete-account/delete-account.component')
        .then(m => m.DeleteAccountComponent),canActivate: [AuthGuard],
  },

  {
    path: 'reportes-usuario',
    loadComponent: () =>
      import('../components/VistaUsuario/reportes-usuario/reportes-usuario.component')
        .then(m => m.ReportesUsuarioComponent),canActivate: [AuthGuard],
  }
];
