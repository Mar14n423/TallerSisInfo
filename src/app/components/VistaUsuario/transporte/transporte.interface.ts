
export interface Ruta {
    id: string;
    nombre: string;
    ubicacionInicio: string;
    ubicacionFin: string;
    coordenadasInicio: [number, number]; 
    coordenadasFin: [number, number];  
    tipoServicio: string;
    horarios: string[];
    duracionEstimada: string;
    disponibilidad: string;
    descripcionVisual: string;
  }