import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ForoService} from '../../../services/foro.service';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    NavbarComponent,
    MatProgressBarModule,
  ],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.scss'
})
export class ForoComponent {

  posts: any[] = [];
  mostrarFormulario: boolean[] = [];
  nuevaRespuesta: string[] = [];

  nuevoPostVisible: boolean = false;
  nuevoTitulo: string = '';
  nuevoMensaje: string = '';
  usuarioActual: string = 'UsuarioDemo';

  constructor(private foroService: ForoService) {
    this.cargarPublicaciones();
  }

  cargarPublicaciones(): void {
    this.foroService.obtenerPublicaciones().subscribe({
      next: (data: any[]) => {
        this.posts = data;
        this.mostrarFormulario = new Array(data.length).fill(false);
        this.nuevaRespuesta = new Array(data.length).fill('');
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
      }
    });
  }

  toggleFormulario(index: number) {
    this.mostrarFormulario[index] = !this.mostrarFormulario[index];
  }

  publicarRespuesta(index: number) {
    const texto = this.nuevaRespuesta[index];
    const publicacionId = this.posts[index].id;

    if (texto && texto.trim() !== '') {
      const nuevaRespuesta = {
        usuario: this.usuarioActual,
        mensaje: texto
      };

      this.foroService.agregarRespuesta(publicacionId, nuevaRespuesta).subscribe({
        next: (respuesta) => {
          this.posts[index].respuestas.push(respuesta);
          this.nuevaRespuesta[index] = '';
          this.mostrarFormulario[index] = false;
        },
        error: (err) => {
          console.error('Error al agregar respuesta:', err);
        }
      });
    }
  }

  mostrarFormularioNuevoPost() {
    this.nuevoPostVisible = !this.nuevoPostVisible;
  }

  crearNuevoPost() {
    if (this.nuevoTitulo.trim() !== '' && this.nuevoMensaje.trim() !== '') {
      const nuevaPublicacion = {
        usuario: this.usuarioActual,
        titulo: this.nuevoTitulo,
        mensaje: this.nuevoMensaje
      };

      this.foroService.crearPublicacion(nuevaPublicacion).subscribe({
        next: (nuevaPost) => {
          this.posts.push({ ...nuevaPost, respuestas: [] });
          this.nuevoTitulo = '';
          this.nuevoMensaje = '';
          this.nuevoPostVisible = false;
        },
        error: (err) => {
          console.error('Error al crear publicación:', err);
        }
      });
    }
  }
}
