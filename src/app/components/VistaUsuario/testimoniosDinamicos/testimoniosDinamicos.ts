import { Component, OnInit } from '@angular/core';
import { ForoService } from '../../../services/foro.service'; 
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
interface Publicacion {
    usuario: string;
    mensaje: string;
  }
  
  @Component({
    selector: 'app-testimonios-dinamicos',
    standalone: true,
    imports: [MatCardModule, MatIconModule, CommonModule],
    templateUrl: './testimonios-dinamicos.component.html',
    styleUrls: ['./testimonios-dinamicos.component.scss']
  })
  export class TestimoniosDinamicosComponent implements OnInit {
    comentarios: Publicacion[] = []; 
  
    constructor(private foroService: ForoService) { }
  
    ngOnInit(): void {
      console.log('Componente TestimoniosDinamicos iniciado');
      this.cargarComentarios();
    }
  
    cargarComentarios(): void {
      this.foroService.obtenerPublicaciones().subscribe(
        (data: Publicacion[]) => {
          this.comentarios = data;
        },
        (error) => {
          console.error('Error al cargar las publicaciones del foro', error);
        }
      );
    }
  }