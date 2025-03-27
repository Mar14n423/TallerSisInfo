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

    @Column(nullable = true)
    private String passwordHash;

    // Constructor vacío requerido por JPA
    public Usuario() {}

    // Constructor con parámetros
    public Usuario(String nombre, String correo, String discapacidad, String passwordHash) {
        this.nombre = nombre;
        this.correo = correo;
        this.discapacidad = discapacidad;
        this.passwordHash = passwordHash;
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

    public String getDiscapacidad() {
        return discapacidad;
    }

    public void setDiscapacidad(String discapacidad)
    {
        this.discapacidad = discapacidad;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

}

