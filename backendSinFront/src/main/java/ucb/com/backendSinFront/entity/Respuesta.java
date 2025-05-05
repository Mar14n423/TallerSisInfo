package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "respuesta")
public class Respuesta {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String usuario;
  private String mensaje;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "publicacion_id")
  @JsonBackReference
  private Publicacion publicacion;

  // Getters y Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsuario() {
    return usuario;
  }

  public void setUsuario(String usuario) {
    this.usuario = usuario;
  }

  public String getMensaje() {
    return mensaje;
  }

  public void setMensaje(String mensaje) {
    this.mensaje = mensaje;
  }

  public Publicacion getPublicacion() {
    return publicacion;
  }

  public void setPublicacion(Publicacion publicacion) {
    this.publicacion = publicacion;
  }
}
