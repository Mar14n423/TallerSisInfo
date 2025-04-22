package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "oferta_empleo")
public class OfertaEmpleo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Long idEmpresa; // Empresa que publica

  @Column(nullable = false)
  private String tituloTrabajo;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String descripcion;

  @Column(nullable = true, columnDefinition = "TEXT")
  private String requisitos;

  @Column(nullable = false)
  private String ubicacion;

  @Column(nullable = false)
  private String tipoContrato;

  @Column(nullable = false)
  private LocalDate fechaPublicacion;

  @Column(nullable = false)
  private String estado; // Ejemplo: "Activo", "Cerrado"

  @Column(name = "imagen_nombre")
  private String imagenNombre;

  public OfertaEmpleo() {}

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

  public LocalDate getFechaPublicacion() { return fechaPublicacion; }
  public void setFechaPublicacion(LocalDate fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }

  public String getEstado() { return estado; }
  public void setEstado(String estado) { this.estado = estado; }

  public String getImagenNombre() { return imagenNombre; }
  public void setImagenNombre(String imagenNombre) { this.imagenNombre = imagenNombre; }
}
