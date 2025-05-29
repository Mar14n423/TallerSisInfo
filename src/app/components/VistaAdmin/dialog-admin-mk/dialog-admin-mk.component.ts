import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-admin-mk',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-admin-mk.component.html',
  styleUrls: ['./dialog-admin-mk.component.scss']
})
export class DialogAdminMkComponent {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAdminMkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productoForm = this.fb.group({
      id: [data?.id || null],
      nombreP: [data?.nombreP || '', Validators.required],
      precio: [data?.precio || '', [Validators.required, Validators.min(0.01)]],
      descripcionP: [data?.descripcionP || ''],
      caracteristicasT: [data?.caracteristicasT || ''],
      imagenU: [data?.imagenU || '']
    });
  }

  guardar(): void {
    if (this.productoForm.valid) {
      this.dialogRef.close(this.productoForm.value);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}