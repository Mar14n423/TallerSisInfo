import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/api/empresas/create';

  constructor() { }

  registrarEmpresa(empresa: any) {
    return axios.post(this.apiUrl, empresa)
      .then(response => response.data)
      .catch(error => {
        console.error('Error al registrar empresa', error);
        throw error;
      });
  }

}
