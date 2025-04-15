import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    NavbarComponent,
    MatProgressBarModule
  ],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.scss'
})
export class ForoComponent {
  posts = [
    {
      usuario: 'Juan2343',
      fecha: '02/05/2024',
      titulo: 'Cocina',
      mensaje: 'Necesito ayuda para cocinar carne con arroz...',
      respuestas: [
        { usuario: 'Pepe34', mensaje: 'No sé :v' },
        { usuario: 'Joselito666', mensaje: 'Creo que son 30 min a fuego lento' }
      ]
    },
    {
      usuario: 'Mariano4543',
      fecha: '02/05/2024',
      titulo: 'Ayuda',
      mensaje: 'Hola, estoy aprendiendo a hacer mole...',
      respuestas: [
        { usuario: 'Pepe34', mensaje: 'Te recomiendo usar libros de cocina mexicana' },
        { usuario: 'Joselito666', mensaje: 'Hay tutoriales en YouTube buenísimos' }
      ]
    }
  ];

  mostrarFormulario: boolean[] = [];
  nuevaRespuesta: string[] = [];

  toggleFormulario(index: number) {
    this.mostrarFormulario[index] = !this.mostrarFormulario[index];
  }

  publicarRespuesta(index: number) {
    const texto = this.nuevaRespuesta[index];
    if (texto && texto.trim() !== '') {
      this.posts[index].respuestas.push({ usuario: 'Tú', mensaje: texto });
      this.nuevaRespuesta[index] = '';
      this.mostrarFormulario[index] = false;
    }
  }
}
