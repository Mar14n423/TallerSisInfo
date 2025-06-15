import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    discapacidad: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  daltonicMode: boolean = false;
  hidePassword: boolean = true;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  toggleColorMode() {
    
  }

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
          localStorage.setItem('usuario', JSON.stringify(response));
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