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

  minDate = new Date(2000, 0, 1); 
  maxDate = new Date(2100, 11, 31); 

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) data?: NEventos.IEvent
  ) {
    const selectedType = this.eventType.find(e => e.icon === data?.icon) ?? null;

    this.formEvent = this.fb.group({
      name: [data?.name ?? '', [Validators.required]],
      id: [data?.id ?? crypto.randomUUID(), [Validators.required]],
      icon: [selectedType, [Validators.required]],
      date: [data?.date ? new Date(data.date) : new Date(), [Validators.required]],
      background: [data?.background ?? '#3f51b5'],
      color: [data?.color ?? '#ffffff'],
      time: [data?.time ?? '10:00 AM', [Validators.required]],
      location: [data?.location ?? 'Sala Principal', [Validators.required]]
    });
    this.formEvent.get('icon')?.valueChanges.subscribe(value => {
      if (value && typeof value === 'object') {
          this.formEvent.patchValue({
              icon: value.icon,
              background: this.formEvent.value.background || '#3f51b5',
              color: this.formEvent.value.color || '#ffffff'
          }, { emitEvent: false });
      }
  });
  }
  getEventStyles(): any {
    return {
      'background-color': this.formEvent.value.background || '#3f51b5',
      'color': this.formEvent.value.color || '#ffffff'
    };
  }

  getEventTooltip(): string {
    const event = this.formEvent.value;
    let tooltip = event.name || 'Nombre del evento';
    
    if (event.location) {
      tooltip += `\nLugar: ${event.location}`;
    }
    
    if (event.time) {
      tooltip += `\nHora: ${event.time}`;
    }
    
    return tooltip;
  }


  save(): void {
    if (this.formEvent.valid) {
        const formValue = this.formEvent.value;
        const eventData: NEventos.IEvent = {
            ...formValue,
            icon: typeof formValue.icon === 'object' ? formValue.icon.icon : formValue.icon, // Asegura string
            date: formValue.date.toISOString()
        };
        this.dialogRef.close();
        this.dialogService.setEvent(eventData);
    }
}
  compareEventTypes(type1: any, type2: any): boolean {
    return type1 && type2 ? type1.id === type2.id : type1 === type2;
  }  
}