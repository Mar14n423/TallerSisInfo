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
    mostrarModalReporteFlag: boolean = false;
  contenidoReportadoId: string = '';
  tipoContenidoReportado: 'post' | 'comentario' = 'post';
  postPadreId: string = ''; // Para comentarios
  razonReporte: string = '';
  otraRazon: string = '';

  // Variables para reglas
  mostrarReglasFlag: boolean = false;
  reglasForo: string = `
    <ol>
      <li><strong>Sé respetuoso:</strong> No toleramos comentarios ofensivos, discriminatorios o ataques personales.</li>
      <li><strong>No spam:</strong> Publicar contenido repetitivo o promocional no está permitido.</li>
      <li><strong>Mantén el contenido relevante:</strong> Los posts deben estar relacionados con la temática del foro.</li>
      <li><strong>Protege la privacidad:</strong> No compartas información personal tuya o de otros.</li>
      <li><strong>Reporta contenido inapropiado:</strong> Usa el botón de reporte para contenido que viola las reglas.</li>
    </ol>
    <p>Los administradores pueden editar o eliminar contenido que infrinja estas reglas.</p>
  `;

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
    mostrarModalReporte(id: string, tipo: 'post' | 'comentario', postPadreId?: string) {
    this.contenidoReportadoId = id;
    this.tipoContenidoReportado = tipo;
    this.postPadreId = postPadreId || '';
    this.mostrarModalReporteFlag = true;
    this.razonReporte = '';
    this.otraRazon = '';
  }

  cerrarModalReporte() {
    this.mostrarModalReporteFlag = false;
  }

  enviarReporte() {
    if (!this.razonReporte) {
      alert('Por favor selecciona una razón para el reporte');
      return;
    }

    const razonFinal = this.razonReporte === 'otro' ? this.otraRazon : this.razonReporte;
    
    const reporte = {
      tipo: this.tipoContenidoReportado,
      contenidoId: this.contenidoReportadoId,
      postPadreId: this.postPadreId,
      usuarioReportador: this.usuarioActual,
      razon: razonFinal,
      fecha: new Date().toISOString()
    };

    // En un entorno real, aquí llamarías al servicio para enviar el reporte
    this.foroService.enviarReporte(reporte).subscribe({
      next: () => {
        alert('Reporte enviado correctamente. Los moderadores revisarán el contenido.');
        this.cerrarModalReporte();
      },
      error: (err) => {
        console.error('Error al enviar reporte:', err);
        alert('Ocurrió un error al enviar el reporte. Por favor intenta nuevamente.');
      }
    });
  }

  mostrarReglas() {
    this.mostrarReglasFlag = true;
  }
}
