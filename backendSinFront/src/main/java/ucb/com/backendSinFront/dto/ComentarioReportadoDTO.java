package ucb.com.backendSinFront.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ComentarioReportadoDTO {
  private Long comentarioId;
  private String contenido;
  private String usuario;
  private LocalDateTime fecha;
  private List<ReporteDetalleDTO> reportes;

  // Getters y Setters
  public Long getComentarioId() { return comentarioId; }
  public void setComentarioId(Long comentarioId) { this.comentarioId = comentarioId; }

  public String getContenido() { return contenido; }
  public void setContenido(String contenido) { this.contenido = contenido; }

  public String getUsuario() { return usuario; }
  public void setUsuario(String usuario) { this.usuario = usuario; }

  public LocalDateTime getFecha() { return fecha; }
  public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

  public List<ReporteDetalleDTO> getReportes() { return reportes; }
  public void setReportes(List<ReporteDetalleDTO> reportes) { this.reportes = reportes; }
}
