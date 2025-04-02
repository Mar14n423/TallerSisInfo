package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "empresa")
public class Empresa {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String nombre;

  @Column(nullable = false, unique = true, length = 150)
  private String correo;

  @Column(nullable = true)
  private String passwordHash;

  @Column(nullable = true, length = 20)
  private String telefono;

  @Column(nullable = true, columnDefinition = "TEXT")
  private String descripcion;

  // Constructor vacío requerido por JPA
  public Empresa() {}

  // Constructor con parámetros
  public Empresa(String nombre, String correo, String passwordHash, String telefono, String descripcion) {
    this.nombre = nombre;
    this.correo = correo;
    this.passwordHash = passwordHash;
    this.telefono = telefono;
    this.descripcion = descripcion;
  }

  // Getters y Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getCorreo() {
    return correo;
  }

  public void setCorreo(String correo) {
    this.correo = correo;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }

  public String getTelefono() {
    return telefono;
  }

  public void setTelefono(String telefono) {
    this.telefono = telefono;
  }

  public String getDescripcion() {
    return descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
  }
}
