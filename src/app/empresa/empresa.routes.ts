import { Routes } from '@angular/router';

export const empresaRoutes: Routes = [
  {
    path: 'logincompany',
    loadComponent: () =>
      import('../components/VistaEmpresa/logincompany/logincompany.component').then(m => m.LoginCompanyComponent)
  },
  {
    path: 'profilecompany',
    loadComponent: () =>
      import('../components/VistaEmpresa/profilecompany/profilecompany.component').then(m => m.ProfilecompanyComponent)
  },
  {
    path: 'homecompany',
    loadComponent: () =>
      import('../components/VistaEmpresa/homecompany/homecompany.component').then(m => m.HomecompanyComponent)
  },
  {
    path: 'empleo-empresa',
    loadComponent: () =>
      import('../components/VistaEmpresa/EmpleoEmpresa/empleoEmpresa.component').then(m => m.EmpleoEmpresaComponent)
  },

  {
    path: 'create-company-account',
    loadComponent: () =>
      import('../components/VistaEmpresa/create-company-account/create-company-account.component').then(m => m.CreateCompanyAccountComponent)
  }
];
