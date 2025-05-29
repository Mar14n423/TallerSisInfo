import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmpleoEmpresaService {
  private apiUrl = 'http://localhost:8080/api/empleos';

  constructor() {}

  subirEmpleo(formData: FormData): Promise<any> {
      return fetch('http://localhost:8080/api/empresa/empleos/crear', {
      method: 'POST',
      body: formData
    }).then(res => {
      if (!res.ok) throw new Error('Error al subir empleo');
      return res.text();
    });
  }

}
