import { Component, OnInit } from '@angular/core';
import { ForoService } from '../../../services/foro.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-testimoniosDinamicos',
  standalone: true,
  imports: [MatCardModule, CommonModule, DatePipe],
  templateUrl: './testimoniosDinamicos.component.html',
  styleUrls: ['./testimoniosDinamicos.component.scss']
})
export class TestimoniosDinamicosComponent implements OnInit {
  comentarios: any[] = [];

  constructor(private foroService: ForoService) { }

  ngOnInit(): void {
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    this.foroService.obtenerTestimonios().subscribe({
      next: (data: any) => {
        this.comentarios = data.map((post: any) => ({
          ...post,
          avatar: post.avatar || 'assets/images/usuario.PNG'
        })).slice(0, 3); 
      },
      error: (err) => {
        console.error('Error al cargar testimonios', err);
      }
    });
  }
}