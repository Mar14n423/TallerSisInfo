import { Component, Inject } from '@angular/core';  // Asegúrate de importar Inject correctamente
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../register/usuario.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class DeleteAccountComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteAccountComponent>,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }  // Asegúrate de que MAT_DIALOG_DATA está siendo inyectado correctamente
  ) {}

  eliminarCuenta() {
  const userId = this.data.user.id;

  this.usuarioService.eliminarUsuario(userId).subscribe({
    next: (response: any) => {
      console.log('Cuenta eliminada:', response);
      this.dialogRef.close('eliminar');  // Cierra el diálogo después de eliminar
    },
    error: (error: any) => {
      console.error('Error al eliminar cuenta:', error);
      alert('Hubo un problema al eliminar la cuenta.');
    }
  });
}

  cerrar() {
    this.dialogRef.close();  // Cierra el diálogo sin eliminar la cuenta
  }
}
