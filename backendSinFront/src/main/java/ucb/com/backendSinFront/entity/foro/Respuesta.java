package ucb.com.backendSinFront.entity.foro;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import ucb.com.backendSinFront.entity.foro.Publicacion;
import ucb.com.backendSinFront.entity.foro.ReporteF;
import com.fasterxml.jackson.annotation.JsonIgnore; //  Import necesario


@Entity
@Table(name = "respuesta")
public class Respuesta {

  @Column(name = "usuario_id")
  private Long usuarioId;

  public Long getUsuarioId() { return usuarioId; }
  public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;
    private String mensaje;
    private LocalDate fecha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publicacion_id")
    @JsonBackReference
    private Publicacion publicacion;
    @OneToMany(mappedBy = "respuesta" /*, cascade = CascadeType.ALL, orphanRemoval = true */)
    @JsonIgnore //  Evita bucle infinito al serializar
    private List<ReporteF> reportes = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.fecha = LocalDate.now();
    }

    public Respuesta() {}

    public Respuesta(String usuario, String mensaje) {
        this.usuario = usuario;
        this.mensaje = mensaje;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public Publicacion getPublicacion() { return publicacion; }
    public void setPublicacion(Publicacion publicacion) { this.publicacion = publicacion; }
    public List<ReporteF> getReportes() { return reportes; }
    public void setReportes(List<ReporteF> reportes) { this.reportes = reportes; }
}
