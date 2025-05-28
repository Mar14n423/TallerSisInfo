package ucb.com.backendSinFront.entity.foro;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import ucb.com.backendSinFront.entity.foro.Respuesta;
import ucb.com.backendSinFront.entity.foro.ReporteF;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "publicacion")
public class Publicacion {

  @Column(name = "usuario_id")
  private Long usuarioId;

  public Long getUsuarioId() { return usuarioId; }
  public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }


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

  @OneToMany(mappedBy = "publicacion" /*, cascade = CascadeType.ALL, orphanRemoval = true */)
  @JsonIgnore //  Evita bucle infinito al serializar
  private List<ReporteF> reportes = new ArrayList<>();


  @PrePersist
  protected void onCreate() {
    this.fecha = LocalDate.now();
  }

  public Publicacion() {}

  public Publicacion(String usuario, String titulo, String mensaje) {
    this.usuario = usuario;
    this.titulo = titulo;
    this.mensaje = mensaje;
  }
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getUsuario() { return usuario; }
  public void setUsuario(String usuario) { this.usuario = usuario; }
  public LocalDate getFecha() { return fecha; }
  public void setFecha(LocalDate fecha) { this.fecha = fecha; }
  public String getTitulo() { return titulo; }
  public void setTitulo(String titulo) { this.titulo = titulo; }
  public String getMensaje() { return mensaje; }
  public void setMensaje(String mensaje) { this.mensaje = mensaje; }
  public List<Respuesta> getRespuestas() { return respuestas; }
  public void setRespuestas(List<Respuesta> respuestas) { this.respuestas = respuestas; }
  public List<ReporteF> getReportes() { return reportes; }
  public void setReportes(List<ReporteF> reportes) { this.reportes = reportes; }

  public void agregarRespuesta(Respuesta respuesta) {
    respuestas.add(respuesta);
    respuesta.setPublicacion(this);
  }
}
