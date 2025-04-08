import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxColorsModule } from 'ngx-colors';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { NEventos } from '../../components/VistaAdmin/eventos/eventos.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxColorsModule,
    MatTooltipModule,
    CommonModule,
    MatIconModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  formEvent: FormGroup = new FormGroup({});

  eventType = [
    {
      id: 'sport',
      value: 'Deporte',
      icon: 'sports_soccer'
    },
    {
      id: 'support',
      value: 'Reunión de apoyo',
      icon: 'group'
    },
    {
      id: 'art',
      value: 'Taller de arte',
      icon: 'palette'
    },
    {
      id: 'therapy',
      value: 'Sesión de terapia',
      icon: 'psychology'
    },
    {
      id: 'music',
      value: 'Música y canto',
      icon: 'music_note'
    },
    {
      id: 'education',
      value: 'Capacitación / Taller',
      icon: 'school'
    },
    {
      id: 'social',
      value: 'Evento social',
      icon: 'emoji_people'
    },
  ];

  private date = new Date();

  minDate = new Date(2000, 0, 1); // Fecha mínima muy atrás
  maxDate = new Date(2100, 11, 31); // Fecha máxima muy adelante

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) data?: NEventos.IEvent
  ) {
    // Parsear la fecha si viene del backend
    const eventDate = data?.date ? new Date(data.date) : new Date();

    this.formEvent = this.fb.group({
      name: [data?.name, [Validators.required]],
      id: [data?.id ?? crypto.randomUUID(), [Validators.required]],
      icon: [data?.icon, [Validators.required]],
      date: [data?.date ?? new Date(), [Validators.required]],
      background: [data?.background],
      color: [data?.color],
    });
    // Actualizar icono cuando cambia el tipo de evento
    this.formEvent.get('icon')?.valueChanges.subscribe(value => {
      const selectedType = this.eventType.find(type => type.icon === value);
      if (selectedType) {
        this.formEvent.patchValue({
          icon: selectedType.icon
        }, { emitEvent: false });
      }
    });
  }


  save(): void {
    if (this.formEvent.valid) {
      const formValue = this.formEvent.value;
      const eventData: NEventos.IEvent = {
        ...formValue,
        date: formValue.date.toISOString() // Convertir a formato ISO para el backend
      };
      this.dialogRef.close();
      this.dialogService.setEvent(eventData);
    }
  }
  compareEventTypes(type1: any, type2: any): boolean {
    return type1 && type2 ? type1.id === type2.id : type1 === type2;
  }  
}