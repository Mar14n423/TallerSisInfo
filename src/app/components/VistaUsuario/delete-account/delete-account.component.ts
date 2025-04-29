import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../register/usuario.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteAccountComponent>,
    private usuarioService: UsuarioService
  ) {}

  eliminarCuenta() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usuarioService.eliminarUsuario(+userId).then(
        () => {
          alert('Tu cuenta ha sido eliminada exitosamente.');
          window.location.href = '/';
        },
        (error) => {
          console.error('Error al eliminar la cuenta:', error);
          alert('Ocurrió un error al eliminar tu cuenta. Detalles: ' + (error.response?.data || 'Error desconocido'));
        }
      );
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
