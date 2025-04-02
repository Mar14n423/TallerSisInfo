import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logincompany',
  templateUrl: './logincompany.component.html',
  styleUrls: ['./iniciar-sesion-empresa.component.scss']
})
export class LoginCompanyComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Validación simple para ejemplo
    if (this.email === '' || this.password === '') {
      this.errorMessage = 'Por favor, ingrese ambos campos.';
      return;
    }

    // Aquí pondrías la lógica para autenticar la empresa
    // Este es solo un ejemplo de la estructura que podrías seguir.
    if (this.email === 'empresa@dominio.com' && this.password === 'contraseñaSegura') {
      this.router.navigate(['/dashboard']); // Redirigir a dashboard o página interna
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}
