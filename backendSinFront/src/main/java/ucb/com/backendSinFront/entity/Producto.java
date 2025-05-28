package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "producto")
public class Producto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nombreP", nullable = false, length = 100)
  private String nombreP;

  @Column(nullable = false)
  private Double precio;

  @Column(columnDefinition = "TEXT")
  private String descripcionP;

  @Column(columnDefinition = "TEXT")
  private String caracteristicasT;

  @Column(columnDefinition = "TEXT")
  private String imagenU;

  // Constructor vacío
  public Producto() {}

  // Constructor con parámetros
  public Producto(String nombreP, Double precio, String descripcionP,
                  String caracteristicasT, String imagenU) {
    this.nombreP = nombreP;
    this.precio = precio;
    this.descripcionP = descripcionP;
    this.caracteristicasT = caracteristicasT;
    this.imagenU = imagenU;
  }

  // Getters y Setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getNombreP() { return nombreP; }
  public void setNombreP(String nombreP) { this.nombreP = nombreP; }

  public Double getPrecio() { return precio; }
  public void setPrecio(Double precio) { this.precio = precio; }

  public String getDescripcionP() { return descripcionP; }
  public void setDescripcionP(String descripcionP) { this.descripcionP = descripcionP; }

  public String getCaracteristicasT() { return caracteristicasT; }
  public void setCaracteristicasT(String caracteristicasT) { this.caracteristicasT = caracteristicasT; }

  public String getImagenU() { return imagenU; }
  public void setImagenU(String imagenU) { this.imagenU = imagenU; }
}
