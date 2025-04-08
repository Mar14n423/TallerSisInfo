import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import axios from 'axios';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FooterComponent, NavbarComponent,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]), // Campo para el nombre
    email: new FormControl('', [Validators.required, Validators.email]), // Campo para el correo
    discapacidad: new FormControl('', [Validators.required]), // Campo para la discapacidad
    password: new FormControl('', [Validators.required]), // Campo para la contraseña
    confirmPassword: new FormControl('', [Validators.required]) // Campo para confirmar la contraseña
  });

  constructor() {}

  onSubmit() {
    if (this.registerForm.valid) {
      // Crear el objeto JSON con la estructura requerida por el backend
      const usuario = {
        nombre: this.registerForm.value.name,
        correo: this.registerForm.value.email,
        discapacidad: this.registerForm.value.discapacidad,
        passwordHash: this.registerForm.value.password
      };

      // Enviar la solicitud POST al backend usando Axios
      axios.post('http://localhost:8080/api/usuarios/create', usuario)
        .then(response => {
          console.log('Usuario registrado con éxito:', response.data);
          alert('Usuario registrado con éxito');
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error);
          alert('Error al registrar usuario');
        });
    } else {
      alert('Por favor, completa el formulario correctamente');
    }
  }
}
