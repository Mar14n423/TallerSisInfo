import { Routes } from '@angular/router';

export const empresaRoutes: Routes = [
  {
    path: 'logincompany',
    loadComponent: () =>
      import('../components/VistaEmpresa/logincompany/logincompany.component').then(m => m.LoginCompanyComponent)
  },
  {
    path: 'create-company-account',
    loadComponent: () =>
      import('../components/VistaEmpresa/create-company-account/create-company-account.component').then(m => m.CreateCompanyAccountComponent)
  }
];
