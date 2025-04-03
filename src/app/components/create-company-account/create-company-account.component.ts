import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from './empresa.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-create-company-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './create-company-account.component.html',
  styleUrls: ['./create-company-account.component.scss']
})
export class CreateCompanyAccountComponent implements OnInit {

  registerCompanyForm!: FormGroup;
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerCompanyForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarPassword: ['', Validators.required],
      telefono: ['', Validators.required],
      descripcion: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('password')?.value === group.get('confirmarPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  onSubmit(): void {
    if (this.registerCompanyForm.valid) {
      const empresa = this.registerCompanyForm.value;
      this.empresaService.registrarEmpresa(empresa).subscribe({
        next: () => {
          this.mensaje = 'Empresa registrada exitosamente';
          this.router.navigate(['/login-empresa']);
        },
        error: () => {
          this.mensaje = 'Error al registrar la empresa. Inténtalo de nuevo';
        }
      });
    } else {
      this.mensaje = 'Por favor completa todos los campos correctamente.';
    }
  }
}
