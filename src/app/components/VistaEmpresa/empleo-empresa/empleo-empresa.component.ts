import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleoEmpresaService } from './empleo-empresa.service';
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

  empleos = [
      { tituloTrabajo: '', descripcion: '', requisitos: '', ubicacion: '', tipoContrato: '', estado: '' },
      { tituloTrabajo: '', descripcion: '', requisitos: '', ubicacion: '', tipoContrato: '', estado: '' },
      { tituloTrabajo: '', descripcion: '', requisitos: '', ubicacion: '', tipoContrato: '', estado: '' },
      { tituloTrabajo: '', descripcion: '', requisitos: '', ubicacion: '', tipoContrato: '', estado: '' }
    ];

  constructor(private empleoService: EmpleoEmpresaService) {}

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
    const empleo = this.empleos[index];
    const fileInput = document.querySelectorAll('input[type="file"]')[index] as HTMLInputElement;
    const files = fileInput?.files;

    if (files && files.length > 0 && empleo.tituloTrabajo && empleo.descripcion) {
      const file = files[0];
      const formData = new FormData();

      formData.append('idEmpresa', '1'); // Usa el ID real si lo tienes
      formData.append('tituloTrabajo', empleo.tituloTrabajo);
      formData.append('descripcion', empleo.descripcion);
      formData.append('requisitos', empleo.requisitos || '');
      formData.append('ubicacion', empleo.ubicacion || '');
      formData.append('tipoContrato', empleo.tipoContrato || '');
      formData.append('imagen', file);

      this.empleoService.subirEmpleo(formData)
        .then(() => {
          this.completados[index] = true;
          console.log('Empleo agregado correctamente');
        })
        .catch(err => {
          alert('Error al subir el empleo. Intenta nuevamente.');
          console.error(err);
        });
    } else {
      alert('Debes completar todos los campos y subir una imagen.');
    }
  }

  eliminarEmpleo(index: number): void {
    this.textos[index] = '';
    this.previews[index] = '';
    this.completados[index] = false;
  }
}
