import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { EmpresaService } from './empresa.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // Si vas a usar botones Material
import { MatIconModule } from '@angular/material/icon';     // Opcional si usas íconos
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FooterComponent, NavbarComponent, MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule ,RouterModule],
  templateUrl: './create-company-account.component.html',
  styleUrls: ['./create-company-account.component.scss']
})
export class CreateCompanyAccountComponent {
  registerCompanyForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmarPassword: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required])
  });

  constructor(private empresaService: EmpresaService) {}

  onSubmit() {
    if (this.registerCompanyForm.valid) {
      const empresa = {
        nombre: this.registerCompanyForm.value.nombre,
        correo: this.registerCompanyForm.value.correo,
        passwordHash: this.registerCompanyForm.value.password,
        confirmarContraseña: this.registerCompanyForm.value.confirmarPassword,
        telefono: this.registerCompanyForm.value.telefono,
        descripcion: this.registerCompanyForm.value.descripcion
      };

      this.empresaService.registrarEmpresa(empresa)
        .then(response => {
          console.log('Empresa registrada con éxito:', response);
          alert('Empresa registrada con éxito');
        })
        .catch(error => {
          console.error('Error al registrar empresa:', error);
          alert('Error al registrar empresa');
        });
    } else {
      alert('Por favor, completa el formulario correctamente');
    }
  }
}
