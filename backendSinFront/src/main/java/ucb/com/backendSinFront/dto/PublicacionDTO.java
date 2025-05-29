package ucb.com.backendSinFront.dto;

import java.util.List;

public class PublicacionDTO {
  private Long id;
  private String usuario;
  private String fecha;
  private String titulo;
  private String mensaje;
  private String usuarioAvatarUrl;
  private List<RespuestaDTO> respuestas; // Nueva lista de respuestas

  // Constructor
  public PublicacionDTO(Long id, String usuario, String fecha, String titulo, String mensaje, String usuarioAvatarUrl) {
    this.id = id;
    this.usuario = usuario;
    this.fecha = fecha;
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.usuarioAvatarUrl = usuarioAvatarUrl;
  }

  // Getters y setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getUsuario() { return usuario; }
  public void setUsuario(String usuario) { this.usuario = usuario; }

  public String getFecha() { return fecha; }
  public void setFecha(String fecha) { this.fecha = fecha; }

  public String getTitulo() { return titulo; }
  public void setTitulo(String titulo) { this.titulo = titulo; }

  public String getMensaje() { return mensaje; }
  public void setMensaje(String mensaje) { this.mensaje = mensaje; }

  public String getUsuarioAvatarUrl() { return usuarioAvatarUrl; }
  public void setUsuarioAvatarUrl(String usuarioAvatarUrl) { this.usuarioAvatarUrl = usuarioAvatarUrl; }

  public List<RespuestaDTO> getRespuestas() { return respuestas; }
  public void setRespuestas(List<RespuestaDTO> respuestas) { this.respuestas = respuestas; }
}
