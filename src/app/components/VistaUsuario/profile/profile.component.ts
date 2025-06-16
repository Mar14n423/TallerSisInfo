import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
import { AuthService } from '../../../services/auth.service';

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
    workExperience: [],
  };

  modoEdicion = false;
  nuevaImagenBase64: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  private cargarPerfil(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.usuarioService.obtenerUsuarioPorId(+userId).subscribe({
      next: (usuario) => this.establecerDatosUsuario(usuario),
      error: (error) => console.error('Error al cargar perfil:', error),
    });
  }

  private establecerDatosUsuario(usuario: any): void {
    this.user = {
      profileImage: usuario.profileImage || 'assets/default-profile.png',
      id: usuario.id,
      name: usuario.nombre,
      role: usuario.tipo === 'A' ? 'Administrador' : 'Usuario',
      specialization: 'No especificada',
      email: usuario.correo,
      phone: usuario.telefono ?? 'No disponible',
      address: usuario.direccion ?? 'No disponible',
      disabilityInfo: usuario.discapacidad || 'No especificada',
      workExperience: [],
    };
  }

  editarPerfil(): void {
    this.modoEdicion = true;
  }

  guardarCambios(
    nameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    phoneInput: HTMLInputElement,
    addressInput: HTMLInputElement,
    discapacidadInput: HTMLInputElement
  ): void {
    if (!this.validarCampos(nameInput, phoneInput, discapacidadInput)) return;

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const usuarioActualizado = this.construirPayloadActualizado(
      nameInput.value,
      emailInput.value,
      phoneInput.value,
      addressInput.value,
      discapacidadInput.value
    );

    this.usuarioService.actualizarUsuario(+userId, usuarioActualizado).subscribe({
      next: () => {
        this.user.name = nameInput.value;
        this.user.email = emailInput.value;
        this.user.phone = phoneInput.value;
        this.user.address = addressInput.value;
        this.user.disabilityInfo = discapacidadInput.value;
        this.modoEdicion = false;
      },
      error: (error) => console.error('Error al actualizar perfil:', error),
    });
  }

  private validarCampos(
    nameInput: HTMLInputElement,
    phoneInput: HTMLInputElement,
    discapacidadInput: HTMLInputElement
  ): boolean {
    const namePattern = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
    const phonePattern = /^[0-9]+$/;
    const discapacidadPattern = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;

    if (!namePattern.test(nameInput.value)) {
      alert('El nombre solo puede contener letras.');
      return false;
    }

    if (!phonePattern.test(phoneInput.value)) {
      alert('El teléfono solo puede contener números.');
      return false;
    }

    if (!discapacidadPattern.test(discapacidadInput.value)) {
      alert('El campo de discapacidad solo puede contener letras.');
      return false;
    }

    return true;
  }

  private construirPayloadActualizado(
    nombre: string,
    correo: string,
    telefono: string,
    direccion: string,
    discapacidad: string
  ) {
    return {
      nombre,
      correo,
      discapacidad,
      tipo: this.user.role === 'Administrador' ? 'A' : 'U',
      profileImage: this.user.profileImage,
      telefono,
      direccion,
      passwordHash: null,
    };
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64Image = e.target.result;
      this.user.profileImage = base64Image;

      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const payload = this.construirPayloadActualizado(
        this.user.name,
        this.user.email,
        this.user.phone,
        this.user.address,
        this.user.disabilityInfo
      );
      payload.profileImage = base64Image;

      this.usuarioService.actualizarUsuario(+userId, payload).subscribe({
        next: () => console.log('Imagen actualizada correctamente'),
        error: (error) => console.error('Error al actualizar la imagen:', error),
      });
    };
    reader.readAsDataURL(file);
  }

  eliminarCuenta(): void {
    const confirmacion = confirm(
      '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.'
    );
    if (!confirmacion || !this.user?.id) {
      alert('El ID del usuario no es válido.');
      return;
    }

    this.usuarioService.eliminarUsuario(this.user.id).subscribe({
      next: () => {
        alert('Tu cuenta ha sido eliminada exitosamente.');
        window.location.href = '/';
      },
      error: (error) => {
        console.error('Error al eliminar la cuenta:', error);
        alert(
          'Ocurrió un error al eliminar tu cuenta. Detalles: ' +
            (error.error?.message || 'Error desconocido')
        );
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
