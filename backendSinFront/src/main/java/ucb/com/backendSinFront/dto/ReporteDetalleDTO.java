package ucb.com.backendSinFront.dto;

import java.time.LocalDateTime;

public class ReporteDetalleDTO {
  private String usuarioReportador;
  private String razon;
  private String otraRazon;
  private LocalDateTime fecha;

  // Getters y Setters
  public String getUsuarioReportador() { return usuarioReportador; }
  public void setUsuarioReportador(String usuarioReportador) { this.usuarioReportador = usuarioReportador; }

  public String getRazon() { return razon; }
  public void setRazon(String razon) { this.razon = razon; }

  public String getOtraRazon() { return otraRazon; }
  public void setOtraRazon(String otraRazon) { this.otraRazon = otraRazon; }

  public LocalDateTime getFecha() { return fecha; }
  public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
}
