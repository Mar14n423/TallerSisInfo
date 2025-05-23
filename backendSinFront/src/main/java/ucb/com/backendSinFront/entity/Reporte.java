package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Reporte {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String descripcion;
  private double latitud;
  private double longitud;
  private LocalDateTime fechaCreacion;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getDescripcion() { return descripcion; }
  public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

  public double getLatitud() { return latitud; }
  public void setLatitud(double latitud) { this.latitud = latitud; }

  public double getLongitud() { return longitud; }
  public void setLongitud(double longitud) { this.longitud = longitud; }

  public LocalDateTime getFechaCreacion() { return fechaCreacion; }
  public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
}
