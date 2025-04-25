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
  selector: 'app-profilecompany',
  standalone: true,
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
    MatListModule
  ],
  templateUrl: './profilecompany.component.html',
  styleUrl: './profilecompany.component.scss'
})
export class ProfilecompanyComponent {
  // Modo edición activado o no
  modoEdicion = false;

  // Datos del usuario simulados para vista no editable
  user: any = {
    name: 'Nombre de Ejemplo',
    email: 'ejemplo@email.com',
    phone: '123456789',
    address: 'Calle Falsa 123',
    role: 'Representante Legal',
    specialization: 'Tecnologías verdes',
    disabilityInfo: 'Ninguna discapacidad declarada',
    profileImage: '',
    workExperience: [
      'CEO en Empresa Verde',
      'Consultor de sostenibilidad en EcoTech',
    ]
  };

  // Datos de la empresa en modo edición
  userCompany: any = {
    name: '',
    email: '',
    phone: '',
    address: '',
    disability: ''
  };

  editarPerfil() {
    this.modoEdicion = true;
    // Copiar datos actuales para edición
    this.userCompany = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address,
      disability: this.user.disabilityInfo
    };
  }

  eliminarCuenta() {
    // Aquí podrías poner una lógica de confirmación
    console.log('Cuenta eliminada (simulación)');
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
