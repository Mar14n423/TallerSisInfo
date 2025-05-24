package ucb.com.backendSinFront.entity.foro;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import ucb.com.backendSinFront.entity.foro.Respuesta;
import ucb.com.backendSinFront.entity.foro.ReporteF;


@Entity
@Table(name = "reporte_foro")
public class ReporteF {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TipoContenido tipo;

    private Long contenidoId;
    private Long postPadreId;
    private String usuarioReportador;
    private String razon;
    private String otraRazon;
    private LocalDateTime fecha;
    private boolean revisado;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publicacion_id", nullable = true)
    private Publicacion publicacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "respuesta_id", nullable = true)
    private Respuesta respuesta;
    public enum TipoContenido {
        POST, COMENTARIO
    }
    public ReporteF() {
    }
    public ReporteF(TipoContenido tipo, Long contenidoId, Long postPadreId, String usuarioReportador, String razon, String otraRazon) {
        this.tipo = tipo;
        this.contenidoId = contenidoId;
        this.postPadreId = postPadreId;
        this.usuarioReportador = usuarioReportador;
        this.razon = razon;
        this.otraRazon = otraRazon;
    }


    @PrePersist
    protected void onCreate() {
        this.fecha = LocalDateTime.now();
        this.revisado = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoContenido getTipo() {
        return tipo;
    }

    public void setTipo(TipoContenido tipo) {
        this.tipo = tipo;
    }

    public Long getContenidoId() {
        return contenidoId;
    }

    public void setContenidoId(Long contenidoId) {
        this.contenidoId = contenidoId;
    }

    public Long getPostPadreId() {
        return postPadreId;
    }

    public void setPostPadreId(Long postPadreId) {
        this.postPadreId = postPadreId;
    }

    public String getUsuarioReportador() {
        return usuarioReportador;
    }

    public void setUsuarioReportador(String usuarioReportador) {
        this.usuarioReportador = usuarioReportador;
    }

    public String getRazon() {
        return razon;
    }

    public void setRazon(String razon) {
        this.razon = razon;
    }

    public String getOtraRazon() {
        return otraRazon;
    }

    public void setOtraRazon(String otraRazon) {
        this.otraRazon = otraRazon;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public boolean isRevisado() {
        return revisado;
    }

    public void setRevisado(boolean revisado) {
        this.revisado = revisado;
    }

    public Publicacion getPublicacion() {
        return publicacion;
    }

    public void setPublicacion(Publicacion publicacion) {
        this.publicacion = publicacion;
    }

    public Respuesta getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(Respuesta respuesta) {
        this.respuesta = respuesta;
    }
}
