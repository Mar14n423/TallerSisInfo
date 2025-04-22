import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute } from '@angular/router';
 import { CommonModule } from '@angular/common';

 @Component({
   selector: 'app-detalle-trabajo',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './detalle-trabajo.component.html',
   styleUrls: ['./detalle-trabajo.component.scss']
 })
 export class DetalleTrabajoComponent implements OnInit {
   trabajoId: string | null = '';
   trabajo: any = null;

   private trabajos = {
     cocina: {
       titulo: 'Cocinero a residencia',
       empresa: 'Aramark',
       ubicacion: 'Las Palmas provincia',
       descripcion: [
         'Preparar una variedad de platos según directrices de producción.',
         'Desarrollarás nuevas habilidades en la cocina.'
       ],
       imagen: 'imagenes/cosina.PNG'
     },
     garzon: {
       titulo: 'Garzón de hotel',
       empresa: 'Melia Hotels',
       ubicacion: 'Illes Balears provincia',
       descripcion: [
         'Grandes oportunidades de crecimiento profesional.',
         'Forma parte de una familia global y trabaja en distintos países.'
       ],
       imagen: 'imagenes/garzon.PNG'
     },
     'cuidador-ninos': {
       titulo: 'Cuidador/a de niños',
       empresa: 'Fundación Niñez Segura',
       ubicacion: 'Madrid',
       descripcion: [
         'Cuidado y acompañamiento de niños pequeños.',
         'Organización de actividades recreativas y apoyo emocional.'
       ],
       imagen: 'imagenes/cuidador de niños.PNG'
     },
     traductor: {
       titulo: 'Traductor freelance',
       empresa: 'LinguaPro',
       ubicacion: 'Trabajo remoto',
       descripcion: [
         'Traducción de documentos técnicos y académicos.',
         'Manejo de inglés, francés y portugués.'
       ],
       imagen: 'imagenes/traductor.PNG'
     }
   };

   constructor(private route: ActivatedRoute) {}

   ngOnInit(): void {
     this.trabajoId = this.route.snapshot.paramMap.get('id');
     this.trabajo = this.trabajos[this.trabajoId as keyof typeof this.trabajos];

   }
 }
