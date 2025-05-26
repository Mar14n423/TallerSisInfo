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

  constructor() {}

  ngOnInit(): void {
    this.cargarDatosMock();
  }

  cargarDatosMock(): void {
    this.postsReportados = [
      {
        id: '1',
        usuario: 'usuario1',
        fecha: new Date('2023-05-15'),
        titulo: '¿Cómo puedo hackear el sistema?',
        mensaje: 'Estoy buscando formas de entrar al sistema administrativo...',
        reportes: 3,
        reportesDetalle: [
          { usuario: 'moderador1', razon: 'Contenido inapropiado', fecha: new Date('2023-05-16') },
          { usuario: 'admin', razon: 'Intento de hacking', fecha: new Date('2023-05-16') },
          { usuario: 'usuario2', razon: 'Contenido peligroso', fecha: new Date('2023-05-15') }
        ]
      },
      {
        id: '2',
        usuario: 'usuario_spam',
        fecha: new Date('2023-05-10'),
        titulo: 'COMPRA MI PRODUCTO!!!',
        mensaje: 'Hola a todos, visiten mi sitio web www.productomilagroso.com...',
        reportes: 5,
        reportesDetalle: [
          { usuario: 'moderador2', razon: 'Spam', fecha: new Date('2023-05-10') },
          { usuario: 'usuario3', razon: 'Spam', fecha: new Date('2023-05-10') },
          { usuario: 'usuario4', razon: 'Enlace sospechoso', fecha: new Date('2023-05-11') }
        ]
      }
    ];
    this.postsReportadosFiltrados = [...this.postsReportados];

    this.usuariosSancionados = [
      {
        id: '101',
        nombre: 'usuario_ofensivo',
        razon: 'Lenguaje ofensivo recurrente',
        finSancion: new Date('2023-06-15')
      },
      {
        id: '102',
        nombre: 'spammer123',
        razon: 'Publicación de spam múltiple',
        finSancion: new Date('2023-05-30')
      }
    ];
    this.usuariosSancionadosFiltrados = [...this.usuariosSancionados];
  }

  guardarConfiguracion(): void {
    alert('Configuración guardada (simulado)\n' + 
          `Reglas: ${this.reglasForo}\n` +
          `Permitir posts: ${this.permiteNuevosPosts}\n` +
          `Permitir comentarios: ${this.permiteComentarios}\n` +
          `Moderación previa: ${this.moderacionPrevia}`);
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
    if(confirm('¿Estás seguro de eliminar este post?')) {
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
}