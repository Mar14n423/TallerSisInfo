package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "publicacion")
public class Publicacion {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String usuario;
  private LocalDate fecha;
  private String titulo;
  private String mensaje;

  @OneToMany(mappedBy = "publicacion", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<Respuesta> respuestas = new ArrayList<>();

  @PrePersist
  protected void onCreate() {
    this.fecha = LocalDate.now();
  }

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

  public LocalDate getFecha() {
    return fecha;
  }

  public void setFecha(LocalDate fecha) {
    this.fecha = fecha;
  }

  public String getTitulo() {
    return titulo;
  }

  public void setTitulo(String titulo) {
    this.titulo = titulo;
  }

  public String getMensaje() {
    return mensaje;
  }

  public void setMensaje(String mensaje) {
    this.mensaje = mensaje;
  }

  public List<Respuesta> getRespuestas() {
    return respuestas;
  }

  public void setRespuestas(List<Respuesta> respuestas) {
    this.respuestas = respuestas;
  }

  // Método para agregar una respuesta
  public void agregarRespuesta(Respuesta respuesta) {
    respuestas.add(respuesta);
    respuesta.setPublicacion(this); // Relacionamos la respuesta con esta publicación
  }
}
