package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "empresa_empleo") // Puedes cambiar este nombre si en tu base de datos la tabla ya tiene otro nombre
public class EmpresaEmpleo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long idEmpresa;

  private String tituloTrabajo;

  @Column(length = 2000)
  private String descripcion;

  @Column(length = 2000)
  private String requisitos;

  private String ubicacion;

  private String tipoContrato;

  private String estado;

  private LocalDate fechaPublicacion;

  private String imagen;

  // === Getters y Setters ===
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getIdEmpresa() {
    return idEmpresa;
  }

  public void setIdEmpresa(Long idEmpresa) {
    this.idEmpresa = idEmpresa;
  }

  public String getTituloTrabajo() {
    return tituloTrabajo;
  }

  public void setTituloTrabajo(String tituloTrabajo) {
    this.tituloTrabajo = tituloTrabajo;
  }

  public String getDescripcion() {
    return descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
  }

  public String getRequisitos() {
    return requisitos;
  }

  public void setRequisitos(String requisitos) {
    this.requisitos = requisitos;
  }

  public String getUbicacion() {
    return ubicacion;
  }

  public void setUbicacion(String ubicacion) {
    this.ubicacion = ubicacion;
  }

  public String getTipoContrato() {
    return tipoContrato;
  }

  public void setTipoContrato(String tipoContrato) {
    this.tipoContrato = tipoContrato;
  }

  public String getEstado() {
    return estado;
  }

  public void setEstado(String estado) {
    this.estado = estado;
  }

  public LocalDate getFechaPublicacion() {
    return fechaPublicacion;
  }

  public void setFechaPublicacion(LocalDate fechaPublicacion) {
    this.fechaPublicacion = fechaPublicacion;
  }

  public String getImagen() {
    return imagen;
  }

  public void setImagen(String imagen) {
    this.imagen = imagen;
  }
}
