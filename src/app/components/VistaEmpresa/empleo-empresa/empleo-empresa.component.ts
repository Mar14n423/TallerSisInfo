import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-empleo-empresa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './empleo-empresa.component.html',
  styleUrls: ['./empleo-empresa.component.scss']
})
export class EmpleoEmpresaComponent {
  previews: string[] = ['', '', '', ''];
  textos: string[] = ['', '', '', ''];
  completados: boolean[] = [false, false, false, false];

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previews[index] = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onTextChange(event: any, index: number): void {
    this.textos[index] = event.target.value;
  }

  agregarEmpleo(index: number): void {
    const texto = this.textos[index]?.trim();
    const imagen = this.previews[index];

    if (texto && imagen) {
      this.completados[index] = true;
    }
  }

  eliminarEmpleo(index: number): void {
    this.textos[index] = '';
    this.previews[index] = '';
    this.completados[index] = false;
  }

}
