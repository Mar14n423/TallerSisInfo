import { Component, OnInit } from '@angular/core'; 
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ForoService} from '../../../services/foro.service';
import { UsuarioService } from '../register/usuario.service';

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
export class ForoComponent implements OnInit { 
  user: any = null;
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
  postPadreId: string = ''; 
  razonReporte: string = '';
  otraRazon: string = '';
  mostrarReglasFlag: boolean = false;
  reglasForo: string = ''; 

  constructor(
    private foroService: ForoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
    this.cargarPublicaciones();
    this.cargarReglasForo(); 
  }

  cargarUsuario(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.usuarioService.obtenerUsuarioPorId(+userId).subscribe({
        next: (usuario) => {
          this.user = usuario;
          this.usuarioActual = usuario.nombre;
        },
        error: (err) => console.error('Error al cargar usuario:', err)
      });
    }
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
          alert('Ocurrió un error al publicar la respuesta. Intenta nuevamente.');
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
          alert('Ocurrió un error al crear la publicación. Intenta nuevamente.');
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
      tipo: this.tipoContenidoReportado.toUpperCase(), 
      contenidoId: Number(this.contenidoReportadoId), 
      postPadreId: this.postPadreId ? Number(this.postPadreId) : null, 
      usuarioReportador: this.usuarioActual,
      razon: razonFinal,
    };

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

  cargarReglasForo(): void {
    this.foroService.obtenerReglas().subscribe({
      next: (data: any[]) => {
        this.reglasForo = this.convertirReglasAHtml(data);
      },
      error: (err) => {
        console.error('Error al cargar reglas:', err);
        this.reglasForo = `
          <ol>
            <li><strong>Error al cargar:</strong> No se pudieron cargar las reglas del foro.</li>
            <li><strong>Sé respetuoso:</strong> No toleramos comentarios ofensivos, discriminatorios o ataques personales.</li>
            <li><strong>No spam:</strong> Publicar contenido repetitivo o promocional no está permitido.</li>
            <li><strong>Mantén el contenido relevante:</strong> Los posts deben estar relacionados con la temática del foro.</li>
            <li><strong>Protege la privacidad:</strong> No compartas información personal tuya o de otros.</li>
            <li><strong>Reporta contenido inapropiado:</strong> Usa el botón de reporte para contenido que viola las reglas.</li>
          </ol>
          <p>Por favor, inténtalo de nuevo más tarde o contacta al soporte técnico.</p>
        `;
      }
    });
  }

  private convertirReglasAHtml(reglas: any[]): string {
    let html = '<ol>';
    reglas.forEach(regla => {
      html += `<li><strong>${regla.titulo}:</strong> ${regla.descripcion}</li>`;
    });
    html += '</ol>';
    return html;
  }
}