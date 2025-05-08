import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
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
    this.user = { ...data.user };  // Clonamos los datos para evitar modificaciones directas
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone],
      address: [this.user.address],
      disabilityInfo: [this.user.disabilityInfo],
      role: [this.user.role],
      specialization: [this.user.specialization]
    });
  }

  ngOnInit(): void {
    // Rellenar los campos del formulario con los datos del usuario
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

  // Método para construir el usuario actualizado
  private construirUsuarioActualizado(): any {
    return {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      address: this.profileForm.value.address,
      disabilityInfo: this.profileForm.value.disabilityInfo,
      role: this.profileForm.value.role,
      specialization: this.profileForm.value.specialization,
      profileImage: this.user.profileImage,
      workExperience: this.user.workExperience
    };
  }

  // Método para guardar los cambios
  guardarCambios() {
    if (this.profileForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const usuarioActualizado = this.construirUsuarioActualizado();

    // Llamada al servicio para actualizar el perfil
    this.usuarioService.actualizarUsuario(this.user.id, usuarioActualizado).then(
      (response: any) => {
        console.log('Perfil actualizado correctamente:', response);
        this.dialogRef.close(response);  // Cierra el diálogo con la respuesta
      },
      (error: any) => {
        console.error('Error al actualizar el perfil:', error);
        alert('Hubo un problema al actualizar el perfil.');
      }
    );
  }

  // Cancelar la edición
  cancelarEdicion() {
    this.dialogRef.close();  // Cierra el diálogo sin realizar cambios
  }

  // Manejar la selección de la imagen de perfil
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;  // Establece la nueva imagen de perfil
      };
      reader.readAsDataURL(file);
    }
  }
}
