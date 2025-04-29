import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../register/usuario.service';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

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
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatDividerModule, 
    MatListModule 
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

  profileForm: FormGroup;
  modoEdicion: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      disabilityInfo: ['']
    });
  }

  ngOnInit(): void {
    const userId = this.getUserId();
    if (userId) {
      this.usuarioService.obtenerUsuarioPorId(userId)
        .then((usuario) => {
          console.log('Usuario cargado:', usuario);
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
          this.profileForm.patchValue({
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone,
            address: this.user.address,
            disabilityInfo: this.user.disabilityInfo
          });
        })
        .catch((error) => console.error('Error al cargar perfil:', error));
    }
  }

  editarPerfil(): void {
    this.modoEdicion = true;
  }

  guardarCambios(): void {
    const userId = this.getUserId();
    if (userId && this.profileForm.valid) {
      const formValues = this.profileForm.value;
      this.user.name = formValues.name;
      this.user.email = formValues.email;
      this.user.phone = formValues.phone;
      this.user.address = formValues.address;
      this.user.disabilityInfo = formValues.disabilityInfo;

      this.usuarioService
        .actualizarUsuario(userId, this.construirUsuarioActualizado())
        .then(() => {
          this.modoEdicion = false;
        })
        .catch((error) =>
          console.error('Error al actualizar perfil:', error)
        );
    }
  }

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

  EliminarCuenta(): void {
    const dialogRef = this.dialog.open(DeleteAccountComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        localStorage.removeItem('userId');
        window.location.href = '/';
      }
    });
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
