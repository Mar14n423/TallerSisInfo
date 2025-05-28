package ucb.com.backendSinFront.dto;

public class RespuestaDTO {
  private Long id;
  private String usuario;
  private String mensaje;
  private String usuarioAvatarUrl;

  public RespuestaDTO(Long id, String usuario, String mensaje, String usuarioAvatarUrl) {
    this.id = id;
    this.usuario = usuario;
    this.mensaje = mensaje;
    this.usuarioAvatarUrl = usuarioAvatarUrl;
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getUsuario() { return usuario; }
  public void setUsuario(String usuario) { this.usuario = usuario; }

  public String getMensaje() { return mensaje; }
  public void setMensaje(String mensaje) { this.mensaje = mensaje; }

  public String getUsuarioAvatarUrl() { return usuarioAvatarUrl; }
  public void setUsuarioAvatarUrl(String usuarioAvatarUrl) { this.usuarioAvatarUrl = usuarioAvatarUrl; }
}
