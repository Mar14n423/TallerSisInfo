import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsuarioService } from '../register/usuario.service';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { EditProfileComponent } from '../editProfile/editProfile.component';
import { Router } from '@angular/router'; // Importar Router

interface User {
  id: number;
  profileImage: string;
  name: string;
  role: string;
  specialization: string;
  email: string;
  phone: string;
  address: string;
  disabilityInfo: string;
  workExperience: any[];
}

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
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule
  ],
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 0,
    profileImage: '',
    name: '',
    role: '',
    specialization: '',
    email: '',
    phone: '',
    address: '',
    disabilityInfo: '',
    workExperience: [],
  };

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    const userId = this.getUserId();
    if (userId) {
      this.usuarioService.obtenerUsuarioPorId(userId)
        .then((usuario) => {
          this.user = {
            id: usuario.id,
            profileImage: usuario.profileImage || 'assets/default-profile.png',
            name: usuario.nombre,
            role: usuario.tipo === 'A' ? 'Administrador' : 'Usuario',
            specialization: 'No especificada',
            email: usuario.correo,
            phone: usuario.telefono ?? 'No disponible',
            address: usuario.direccion ?? 'No disponible',
            disabilityInfo: usuario.discapacidad || 'No especificada',
            workExperience: [],
          };
        })
        .catch((error) => console.error('Error al cargar perfil:', error));
    }
  }

  // Método para abrir el diálogo de edición de perfil
  editarPerfil(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '400px',  // Tamaño del diálogo
      data: { user: this.user }  // Pasa los datos del usuario al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;  // Si el usuario ha actualizado el perfil, actualiza los datos
      }
    });
  }

  // Método para abrir el diálogo de eliminación de cuenta
  EliminarCuenta(): void {
    const dialogRef = this.dialog.open(DeleteAccountComponent, {
      width: '400px',
      data: { user: this.user }  // Pasa los datos del usuario para la eliminación
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'eliminar') {
        this.router.navigate(['/login']);  // Redirige al login después de eliminar la cuenta
      }
    });
  }

  // Método para manejar la selección de imagen de perfil
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.user.profileImage = base64Image;

        const userId = this.getUserId();
        if (userId) {
          this.usuarioService
            .actualizarUsuario(userId, this.construirUsuarioActualizado())
            .then(() => console.log('Imagen actualizada correctamente'))
            .catch((error) =>
              console.error('Error al actualizar la imagen:', error)
            );
        }
      };
      reader.readAsDataURL(file);
    }
  }

  private construirUsuarioActualizado(): any {
    return {
      nombre: this.user.name,
      correo: this.user.email,
      discapacidad: this.user.disabilityInfo,
      tipo: this.user.role === 'Administrador' ? 'A' : 'U',
      profileImage: this.user.profileImage,
      telefono: this.user.phone,
      direccion: this.user.address,
      passwordHash: null
    };
  }

  private getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? +id : null;
  }
}
