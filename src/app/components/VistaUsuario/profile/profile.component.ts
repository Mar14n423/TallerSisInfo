import { Component } from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent, MatCardModule, MatInputModule,MatButtonModule,MatToolbarModule,
    MatIconModule,MatMenuModule,MatTooltipModule,MatDividerModule, MatListModule ]
})
export class ProfileComponent {
  user = {
    profileImage: '',
    name: 'Nombre de ejemplo',
    role: 'Usuario',
    specialization: 'Especialidad',
    email: 'usuario@example.com',
    phone: '12345678',
    address: 'Calle Ejemplo 123',
    disabilityInfo: 'Información sobre discapacidad',
    workExperience: ['Trabajo 1', 'Trabajo 2']
  };

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
    
  }

  eliminarCuenta(): void {
    console.log('Eliminar cuenta clickeado');
  }
}
