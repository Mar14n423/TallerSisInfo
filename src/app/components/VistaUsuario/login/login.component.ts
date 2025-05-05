import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../register/usuario.service'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { NavbarComponent } from '../../../shared/navbar/navbar.component'; // Importa NavbarComponent
import { FooterComponent } from '../../../shared/footer/footer.component'; // Importa FooterComponent

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, // Agrega CommonModule aquí
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Propiedad para almacenar mensajes de error

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    const usuario = {
      correo: this.email, // Asegúrate de que el campo se llame "correo"
      passwordHash: this.password, // Asegúrate de que el campo se llame "passwordHash"
    };

    this.usuarioService
      .loginUsuario(usuario)
      .then((response) => {
        console.log('Inicio de sesión exitoso', response);

        // ✅ GUARDAR EL ID DEL USUARIO EN LOCALSTORAGE
        localStorage.setItem('userId', response.id);

        // ✅ REDIRIGIR AL PERFIL (o donde quieras)
        this.router.navigate(['/profile']); // Puedes cambiar la ruta si es necesario
      })
      .catch((error) => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      });
  }

  }
