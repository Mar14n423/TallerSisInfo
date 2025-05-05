import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import axios from 'axios';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
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
      const usuario = {
        nombre: this.registerForm.value.name,
        correo: this.registerForm.value.email,
        discapacidad: this.registerForm.value.discapacidad,
        passwordHash: this.registerForm.value.password
      };

      axios.post('http://localhost:8080/api/usuarios/create', usuario)
        .then(response => {
          console.log('Usuario registrado con éxito:', response.data);

          // ✅ Guardar el ID del usuario
          localStorage.setItem('userId', response.data.id);

          // ✅ Redirigir manualmente a la página de perfil
          window.location.href = '/profile';
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
