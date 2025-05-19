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
import { EmpresaService } from '../create-company-account/empresa.service';

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
export class ProfilecompanyComponent implements OnInit {

  // ✅ Propiedad necesaria para que el template funcione
  user: any = {
    profileImage: '',
    id: null,
    name: '',
    role: 'Empresa',
    specialization: '',
    email: '',
    phone: '',
    address: '',
    disabilityInfo: '',
    workExperience: []
  };

  userCompany: any = {
    name: '',
    email: '',
    phone: '',
    address: '',
    disability: ''
  };

  modoEdicion: boolean = false;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    const empresaId = localStorage.getItem('empresaId');
    if (empresaId) {
      this.empresaService.obtenerEmpresaPorId(+empresaId)
        .then((empresa) => {
          console.log('Empresa cargada:', empresa);
          this.user = {
            profileImage: empresa.profileImage || 'assets/default-profile.png',
            id: empresa.id,
            name: empresa.nombre,
            role: 'Empresa',
            specialization: empresa.rubro || 'No especificado',
            email: empresa.correo,
            phone: empresa.telefono ?? 'No disponible',
            address: empresa.direccion ?? 'No disponible',
            disabilityInfo: empresa.discapacidad || 'No especificada',
            workExperience: []
          };
        })
        .catch((error) => console.error('Error al cargar empresa:', error));
    }
  }

  editarPerfil(): void {
    this.modoEdicion = true;
    this.userCompany = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address,
      disability: this.user.disabilityInfo
    };
  }

  guardarCambios(
    nameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    phoneInput: HTMLInputElement,
    addressInput: HTMLInputElement,
    discapacidadInput: HTMLInputElement
  ): void {
    const empresaId = localStorage.getItem('empresaId');
    if (empresaId) {
      const empresaActualizada = {
        nombre: nameInput.value,
        correo: emailInput.value,
        telefono: phoneInput.value,
        direccion: addressInput.value,
        discapacidad: discapacidadInput.value,
        profileImage: this.user.profileImage
      };

      this.empresaService
        .actualizarEmpresa(+empresaId, empresaActualizada)
        .then(() => {
          this.user.name = nameInput.value;
          this.user.email = emailInput.value;
          this.user.phone = phoneInput.value;
          this.user.address = addressInput.value;
          this.user.disabilityInfo = discapacidadInput.value;
          this.modoEdicion = false;
        })
        .catch((error) => console.error('Error al actualizar empresa:', error));
    }
  }

  eliminarCuenta() {
    const empresaId = localStorage.getItem('empresaId');
    if (!empresaId) return;

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta cuenta? Esta acción es irreversible.');
    if (confirmacion) {
      this.empresaService.eliminarEmpresa(+empresaId)
        .then(() => {
          alert('Cuenta eliminada correctamente.');
          localStorage.clear();
          window.location.href = '/';
        })
        .catch(error => {
          console.error('Error al eliminar la cuenta:', error);
          alert('Error al eliminar la cuenta. Intenta más tarde.');
        });
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

        const empresaId = localStorage.getItem('empresaId');
        if (empresaId) {
          const empresaActualizada = {
            nombre: this.user.name,
            correo: this.user.email,
            telefono: this.user.phone,
            direccion: this.user.address,
            discapacidad: this.user.disabilityInfo,
            profileImage: base64Image
          };

          this.empresaService
            .actualizarEmpresa(+empresaId, empresaActualizada)
            .then(() => console.log('Imagen actualizada correctamente'))
            .catch((error) => console.error('Error al actualizar la imagen:', error));
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
