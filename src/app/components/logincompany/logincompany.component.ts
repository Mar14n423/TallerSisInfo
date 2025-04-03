import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logincompany',
  templateUrl: './logincompany.component.html',
  styleUrls: ['./logincompany.component.scss']
})
export class LoginCompanyComponent {
  credenciales = {
    email: '',
    password: ''
  };

  mensaje: string = '';

  constructor(private empresaService: EmpresaService, private router: Router) {}

  validarEmail(email: string): boolean {
    // Expresión regular básica para validar email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  onSubmit() {
    if (!this.credenciales.email || !this.credenciales.password) {
      this.mensaje = 'Por favor completa todos los campos.';
      return;
    }

    if (!this.validarEmail(this.credenciales.email)) {
      this.mensaje = 'El correo electrónico no es válido.';
      return;
    }

    this.empresaService.iniciarSesionEmpresa(this.credenciales).subscribe({
      next: (respuesta: any) => {
        this.mensaje = '';
        if (respuesta === 'Inicio de sesión exitoso.') {
          this.router.navigate(['/empresa/dashboard']); // Ajustar según tu ruta real
        } else {
          this.mensaje = respuesta;
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.mensaje = err.error;
        } else if (err.status === 401) {
          this.mensaje = 'Contraseña incorrecta.';
        } else if (err.status === 404) {
          this.mensaje = 'Correo no encontrado.';
        } else {
          this.mensaje = 'Ocurrió un error al intentar iniciar sesión.';
        }
      }
    });
  }
}

