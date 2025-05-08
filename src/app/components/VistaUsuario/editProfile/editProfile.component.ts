import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { UsuarioService } from '../register/usuario.service';

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
  workExperience: string[];
}

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
})
export class EditProfileComponent implements OnInit {
  user: User;
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.user = { ...data.user };
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      disabilityInfo: [''],
      role: [''],
      specialization: ['']
    });
  }

  ngOnInit(): void {
    this.profileForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address,
      disabilityInfo: this.user.disabilityInfo,
      role: this.user.role,
      specialization: this.user.specialization
    });
  }

  guardarCambios(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;
      this.user = {
        ...this.user,
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        address: formValues.address,
        disabilityInfo: formValues.disabilityInfo,
        role: formValues.role,
        specialization: formValues.specialization
      };

      this.usuarioService
        .actualizarUsuario(this.user.id, this.construirUsuarioActualizado())
        .then(() => {
          this.dialogRef.close('updated');
        })
        .catch((error) => {
          console.error('Error al actualizar perfil:', error);
        });
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  agregarExperiencia(): void {
    this.user.workExperience = this.user.workExperience || [];
    this.user.workExperience.push('');
  }

  eliminarExperiencia(index: number): void {
    this.user.workExperience.splice(index, 1);
  }

  cancelarEdicion(): void {
    this.dialogRef.close();
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
}