import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../create-company-account/empresa.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { NavbarComponent } from '../../../shared/navbar/navbar.component'; // Importa NavbarComponent
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, // Agrega CommonModule aquí
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './logincompany.component.html',
  styleUrls: ['./logincompany.component.scss'],
})
export class LogincompanyComponent {
  emailE: string = '';
  passwordE: string = '';
  errorMessageE: string = ''; // Propiedad para almacenar mensajes de error

  constructor(private empresaService: EmpresaService, private router: Router) {}

  onSubmit() {
    const empresa = {
      correo: this.emailE,
      passwordHash: this.passwordE,
    };

    this.empresaService.loginEmpresa(empresa)
      .then((response) => {
        // Solo redirige si hay respuesta (éxito)
        if (response) {
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        this.errorMessageE = error.message; // Muestra el mensaje del backend
      });
  }

}
