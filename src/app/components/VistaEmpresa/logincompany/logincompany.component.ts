import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../create-company-account/empresa.service'; // Ajusta si tu ruta es diferente
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
      .then((response) => {
        console.log('Inicio de sesión exitoso como empresa', response);
        localStorage.setItem('empresa', JSON.stringify(response));
        this.router.navigate(['/']); // Ruta de redirección tras login exitoso
      })
      .catch((error) => {
        console.error('Error al iniciar sesión de empresa', error);
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      });
  }
}
