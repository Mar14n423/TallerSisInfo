package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_publicacion")
public class HistorialPublicacion {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long idOferta;

  private Long idEmpresa;

  private String accion; // "CREADA", "EDITADA", "ELIMINADA"

  private LocalDateTime fechaAccion;

  @Column(columnDefinition = "TEXT")
  private String descripcionSnapshot; // descripción de la oferta en ese momento

  public HistorialPublicacion() {}

  // Getters
  public Long getId() {
    return id;
  }
  public Long getIdOferta() {
    return idOferta;
  }
  public Long getIdEmpresa() {
    return idEmpresa;
  }
  public String getAccion() {
    return accion;
  }
  public LocalDateTime getFechaAccion() {
    return fechaAccion;
  }
  public String getDescripcionSnapshot() {
    return descripcionSnapshot;
  }

  // Setters
  public void setId(Long id) {
    this.id = id;
  }
  public void setIdOferta(Long idOferta) {
    this.idOferta = idOferta;
  }
  public void setIdEmpresa(Long idEmpresa) {
    this.idEmpresa = idEmpresa;
  }
  public void setAccion(String accion) {
    this.accion = accion;
  }
  public void setFechaAccion(LocalDateTime fechaAccion) {
    this.fechaAccion = fechaAccion;
  }
  public void setDescripcionSnapshot(String descripcionSnapshot) {
    this.descripcionSnapshot = descripcionSnapshot;
  }
}
