import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { UsuarioService } from '../register/usuario.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    NavbarComponent,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
  ],
})
export class ProfileComponent implements OnInit {
  user: any = {
    profileImage: '',
    name: '',
    role: '',
    specialization: '',
    email: '',
    phone: '',
    address: '',
    disabilityInfo: '',
    workExperience: []
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usuarioService.obtenerUsuarioPorId(+userId)
        .then(usuario => {
          this.user = {
            profileImage: 'assets/default-profile.png',
            name: usuario.nombre,
            role: usuario.tipo === 'A' ? 'Administrador' : 'Usuario',
            specialization: 'No especificada',
            email: usuario.correo,
            phone: 'No disponible',
            address: 'No disponible',
            disabilityInfo: usuario.discapacidad || 'No especificada',
            workExperience: [] // Puedes llenarlo con info real más adelante
          };
        })
        .catch(error => console.error('Error al cargar perfil:', error));
    } else {
      console.warn('No hay usuario logueado en localStorage.');
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  editarPerfil(): void {
    console.log('Editar perfil clickeado');
    // Aquí puedes abrir un formulario de edición o redirigir
  }

  eliminarCuenta(): void {
    console.log('Eliminar cuenta clickeado');
    // Aquí puedes llamar un método DELETE del UsuarioService
  }
}
