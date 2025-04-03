package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "evento")
public class Evento {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String nombre;

  @Column(nullable = false, length = 100)
  private String baseDeDatos;

  @Column(nullable = false)
  private Date fecha;

  // Constructor vacío requerido por JPA
  public Evento() {}

  // Constructor con parámetros
  public Evento(String nombre, String baseDeDatos, Date fecha) {
    this.nombre = nombre;
    this.baseDeDatos = baseDeDatos;
    this.fecha = fecha;
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

  public String getBaseDeDatos() {
    return baseDeDatos;
  }

  public void setBaseDeDatos(String baseDeDatos) {
    this.baseDeDatos = baseDeDatos;
  }

  public Date getFecha() {
    return fecha;
  }

  public void setFecha(Date fecha) {
    this.fecha = fecha;
  }
}
