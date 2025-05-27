package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String nombre;

  @Column(nullable = false, unique = true, length = 150)
  private String correo;

  @Column(nullable = true, length = 50)
  private String discapacidad;

  @Column(nullable = false, length = 255)
  private String passwordHash;

  @Column(nullable = true, length = 1)
  private String tipo;

  @Column(columnDefinition = "TEXT")
  private String profileImage;

  @Column(nullable = true, length = 20)
  private String telefono;

  @Column(nullable = true, length = 200)
  private String direccion;

  public Usuario() {}

  public Usuario(String nombre, String correo, String discapacidad, String passwordHash, String tipo) {
    this.nombre = nombre;
    this.correo = correo;
    this.discapacidad = discapacidad;
    this.passwordHash = passwordHash;
    this.tipo = tipo;
  }

  // Getters y Setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getNombre() { return nombre; }
  public void setNombre(String nombre) { this.nombre = nombre; }

  public String getCorreo() { return correo; }
  public void setCorreo(String correo) { this.correo = correo; }

  public String getDiscapacidad() { return discapacidad; }
  public void setDiscapacidad(String discapacidad) { this.discapacidad = discapacidad; }

  public String getPasswordHash() { return passwordHash; }
  public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

  public String getTipo() { return tipo; }
  public void setTipo(String tipo) { this.tipo = tipo; }

  public String getProfileImage() { return profileImage; }
  public void setProfileImage(String profileImage) { this.profileImage = profileImage; }

  public String getTelefono() { return telefono; }
  public void setTelefono(String telefono) { this.telefono = telefono; }

  public String getDireccion() { return direccion; }
  public void setDireccion(String direccion) { this.direccion = direccion; }
}
