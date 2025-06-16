package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "oferta_empleo") // Este será el nombre final de tu tabla
public class OfertaEmpleo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Long idEmpresa;

  @Column(nullable = false)
  private String tituloTrabajo;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String descripcion;

  @Column(columnDefinition = "TEXT")
  private String requisitos;

  @Column(nullable = false)
  private String ubicacion;

  @Column(nullable = false)
  private String tipoContrato;

  @Column(nullable = false)
  private String estado;

  @Column(nullable = false)
  private LocalDate fechaPublicacion;

  @Column(name = "imagen_nombre", length = 500)
  private String imagenNombre;

  // === Getters y Setters ===

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public Long getIdEmpresa() { return idEmpresa; }
  public void setIdEmpresa(Long idEmpresa) { this.idEmpresa = idEmpresa; }

  public String getTituloTrabajo() { return tituloTrabajo; }
  public void setTituloTrabajo(String tituloTrabajo) { this.tituloTrabajo = tituloTrabajo; }

  public String getDescripcion() { return descripcion; }
  public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

  public String getRequisitos() { return requisitos; }
  public void setRequisitos(String requisitos) { this.requisitos = requisitos; }

  public String getUbicacion() { return ubicacion; }
  public void setUbicacion(String ubicacion) { this.ubicacion = ubicacion; }

  public String getTipoContrato() { return tipoContrato; }
  public void setTipoContrato(String tipoContrato) { this.tipoContrato = tipoContrato; }

  public String getEstado() { return estado; }
  public void setEstado(String estado) { this.estado = estado; }

  public LocalDate getFechaPublicacion() { return fechaPublicacion; }
  public void setFechaPublicacion(LocalDate fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }

  public String getImagenNombre() { return imagenNombre; }
  public void setImagenNombre(String imagenNombre) { this.imagenNombre = imagenNombre; }
}
