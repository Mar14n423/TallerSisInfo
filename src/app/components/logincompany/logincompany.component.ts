// logincompany.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../empresa.service'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { NavbarComponent } from '../../shared/navbar/navbar.component'; // Importa NavbarComponent
import { FooterComponent } from '../../shared/footer/footer.component'; // Importa FooterComponent

@Component({
  selector: 'app-logincompany',
  standalone: true,
    imports: [
      FormsModule,
      CommonModule, // Agrega CommonModule aquí
      NavbarComponent,
      FooterComponent,
      ]
  templateUrl: './logincompany.component.html',
  styleUrls: ['./logincompany.component.scss']
})
export class LoginCompanyComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private empresaService: EmpresaService, private router: Router) {}

  // Método para manejar el formulario de login de empresa
  onSubmit() {
                 const usuario = {
                   correo: this.email, // Asegúrate de que el campo se llame "correo"
                   passwordHash: this.password, // Asegúrate de que el campo se llame "passwordHash"
                 };

                 this.usuarioService
                   .loginUsuario(usuario)
                   .then((response) => {
                     console.log('Inicio de sesión exitoso', response);
                     // Redirigir al usuario a la página de inicio o dashboard
                     this.router.navigate(['/']); // Cambia '/' por la ruta que desees
                   })
                   .catch((error) => {
                     console.error('Error al iniciar sesión', error);
                     // Mostrar mensaje de error al usuario
                     this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
                   });
               }
}
