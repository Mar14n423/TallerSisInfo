import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-foroAdmin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './foroAdmin.component.html',
  styleUrls: ['./foroAdmin.component.scss']
})
export class ForoAdminComponent implements OnInit {
  reglasForo: string = '1. Sé respetuoso con los demás usuarios\n2. No spam\n3. Mantén el contenido relevante';
  permiteNuevosPosts: boolean = true;
  permiteComentarios: boolean = true;
  moderacionPrevia: boolean = false;

  filtroBusqueda: string = '';
  postsReportados: any[] = [];
  postsReportadosFiltrados: any[] = [];
  columnasUsuarios: string[] = ['usuario', 'razon', 'finSancion', 'acciones'];
  usuariosSancionados: any[] = [];
  usuariosSancionadosFiltrados: any[] = [];

  estadisticas = {
    totalPosts: 1245,
    postsDia: 23,
    usuariosActivos: 156,
    postsReportados: 5
  };

  postSeleccionado: any = null;

  constructor(private http: HttpClient) {}

  comentariosReportados: any[] = [];
  comentariosReportadosFiltrados: any[] = [];

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }


  cargarComentariosReportados(): void {
    this.http.get<any[]>('http://localhost:8080/api/foro/reportes/comentarios', this.getAuthHeaders()).subscribe({
      next: (data) => {
        const agrupados = this.agruparPorComentario(data);
        this.comentariosReportados = agrupados;
        this.comentariosReportadosFiltrados = [...agrupados];
      },
      error: (err) => {
        console.error('Error al cargar comentarios reportados:', err);
      }
    });
  }

  private agruparPorComentario(reportes: any[]): any[] {
    const resultado: any[] = [];

    for (const rep of reportes) {
      resultado.push({
        id: rep.comentarioId,
        mensaje: rep.contenido,
        usuario: rep.usuario,
        fecha: rep.fecha,
        reportes: rep.reportes.length,
        reportesDetalle: rep.reportes.map((r: any) => ({
          usuario: r.usuarioReportador,
          razon: r.razon,
          fecha: r.fecha
        }))
      });
    }

    return resultado;
  }


  eliminarComentario(id: string): void {
    if (confirm('¿Eliminar este comentario?')) {
      this.http.delete(`http://localhost:8080/api/foro/comentario/${id}`).subscribe({
        next: () => {
          this.comentariosReportados = this.comentariosReportados.filter(c => c.id !== id);
          this.comentariosReportadosFiltrados = this.comentariosReportadosFiltrados.filter(c => c.id !== id);
          alert('Comentario eliminado');
        },
        error: err => {
          console.error('Error al eliminar comentario:', err);
          alert('Error al eliminar comentario');
        }
      });
    }
  }

  ignorarComentario(id: string): void {
    this.comentariosReportados = this.comentariosReportados.filter(c => c.id !== id);
    this.comentariosReportadosFiltrados = this.comentariosReportadosFiltrados.filter(c => c.id !== id);
    alert('Reporte ignorado');
  }

  verDetallesComentario(comentario: any): void {
    this.postSeleccionado = comentario;
  }
  ngOnInit(): void {

      this.cargarReglasDesdeBackend();
      this.cargarComentariosReportados(); // ✅ Carga reales
      this.cargarPostsReportados();
  }

  cargarPostsReportados(): void {
    this.http.get<any[]>('http://localhost:8080/api/foro/reportes/posts', this.getAuthHeaders()).subscribe({
      next: (data) => {
        const agrupados = this.agruparPorPost(data);
        this.postsReportados = agrupados;
        this.postsReportadosFiltrados = [...agrupados];
      },
      error: (err) => {
        console.error('Error al cargar posts reportados:', err);
        console.error('Detalles del error completo:', JSON.stringify(err, null, 2));
      }
    });
  }

  private agruparPorPost(reportes: any[]): any[] {
    const mapa = new Map<string, any>();
    for (const rep of reportes) {
      const id = rep.publicacion.id;
      if (!mapa.has(id)) {
        mapa.set(id, {
          id,
          titulo: rep.publicacion.titulo,
          mensaje: rep.publicacion.mensaje,
          usuario: rep.publicacion.usuario,
          fecha: rep.publicacion.fecha,
          reportes: 0,
          reportesDetalle: []
        });
      }
      const post = mapa.get(id);
      post.reportes += 1;
      post.reportesDetalle.push({
        usuario: rep.usuarioReportador,
        razon: rep.razon,
        fecha: rep.fecha
      });
    }
    return Array.from(mapa.values());
  }




  guardarConfiguracion(): void {
    const reglas = this.reglasForo
      .split('\n')
      .filter(linea => linea.trim() !== '')
      .map((texto, i) => ({
        titulo: `Regla ${i + 1}`,
        descripcion: texto.trim(),
        orden: i + 1
      }));

    this.http.post('http://localhost:8080/api/foro/reglas', reglas, {
      responseType: 'text'
    }).subscribe({
      next: (res) => {
        console.log('✅ Respuesta de backend:', res);
        alert('Reglas guardadas correctamente');
      },
      error: (err) => {
        console.error('❌ Error completo al guardar reglas:', err);
        alert('Ocurrió un error al guardar las reglas');
      }
    });
  }



  filtrarContenido(): void {
    const filtro = this.filtroBusqueda.toLowerCase();

    this.postsReportadosFiltrados = this.postsReportados.filter(post =>
      post.usuario.toLowerCase().includes(filtro) ||
      post.titulo.toLowerCase().includes(filtro) ||
      post.mensaje.toLowerCase().includes(filtro));

    this.usuariosSancionadosFiltrados = this.usuariosSancionados.filter(user =>
      user.nombre.toLowerCase().includes(filtro) ||
      user.razon.toLowerCase().includes(filtro));
  }

  eliminarPost(postId: string): void {
    if (confirm('¿Estás seguro de eliminar este post?')) {
      this.postsReportados = this.postsReportados.filter(p => p.id !== postId);
      this.postsReportadosFiltrados = this.postsReportadosFiltrados.filter(p => p.id !== postId);
      this.estadisticas.postsReportados--;
      alert('Post eliminado (simulado)');
    }
  }

  ignorarReporte(postId: string): void {
    this.postsReportados = this.postsReportados.filter(p => p.id !== postId);
    this.postsReportadosFiltrados = this.postsReportadosFiltrados.filter(p => p.id !== postId);
    this.estadisticas.postsReportados--;
    alert('Reporte ignorado (simulado)');
  }

  quitarSancion(usuarioId: string): void {
    this.usuariosSancionados = this.usuariosSancionados.filter(u => u.id !== usuarioId);
    this.usuariosSancionadosFiltrados = this.usuariosSancionadosFiltrados.filter(u => u.id !== usuarioId);
    alert('Sanción removida (simulado)');
  }

  verDetallesPost(post: any): void {
    this.postSeleccionado = post;
  }

cargarReglasDesdeBackend(): void {
  this.http.get<any[]>('http://localhost:8080/api/foro/reglas', this.getAuthHeaders()).subscribe({
    next: (data) => {
      this.reglasForo = data
        .sort((a, b) => a.orden - b.orden)
        .map(regla => regla.descripcion)
        .join('\n');
    },
    error: (err) => {
      console.error('❌ Error al cargar reglas desde backend:', err);
      this.reglasForo = 'Error al cargar reglas.';
    }
  });
}
}
