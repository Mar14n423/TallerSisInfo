import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-company-account',
  standalone: true, // 🔹 Importante si no usa un módulo
  imports: [RouterModule, FooterComponent, NavbarComponent,ReactiveFormsModule], // 🔹 Permite reutilizar Navbar y Footer
  templateUrl: './create-company-account.component.html',
  styleUrls: ['./create-company-account.component.scss']
})
export class CreateCompanyAccountComponent {
  registerCompanyForm = new FormGroup({
    empresa: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    telefono: new FormControl(''),
    correo: new FormControl('')
  });

  onSubmit() {
    console.log('Datos del formulario:', this.registerCompanyForm.value);
  }
}
