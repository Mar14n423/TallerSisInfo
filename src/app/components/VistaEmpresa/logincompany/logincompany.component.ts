import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../create-company-account/empresa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-logincompany',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './logincompany.component.html',
  styleUrls: ['./logincompany.component.scss'],
})
export class LoginCompanyComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private empresaService: EmpresaService, private router: Router) {}

  onSubmit() {
    const empresa = {
      correo: this.email,
      passwordHash: this.password,
    };

    this.empresaService
      .loginEmpresa(empresa)
      .then((response: any) => {
        console.log('Empresa logueada exitosamente', response);
        localStorage.setItem('empresa', JSON.stringify(response));
        this.router.navigate(['/dashboard-empresa']);
      })
      .catch((error: any) => {
        if (error.response?.status === 401) {
          this.errorMessage = 'Correo o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Intente más tarde.';
        }
      });
  }
}
