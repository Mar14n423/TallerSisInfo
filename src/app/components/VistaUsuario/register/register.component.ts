import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import axios from 'axios';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
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

  constructor(private usuarioService: UsuarioService, private router: Router) {}

   onSubmit() {
    if (this.registerForm.valid) {
      const usuario = {
        nombre: this.registerForm.value.name,
        correo: this.registerForm.value.email,
        discapacidad: this.registerForm.value.discapacidad,
        passwordHash: this.registerForm.value.password
      };

      this.usuarioService.registrarUsuario(usuario).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito:', response);
          localStorage.setItem('userId', response.id);
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          alert('Error al registrar usuario');
        }
      });
    } else {
      alert('Por favor, completa el formulario correctamente');
    }
  }
}









