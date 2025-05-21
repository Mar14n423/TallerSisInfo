package ucb.com.backendSinFront.entity.foro;

import jakarta.persistence.*;

@Entity
@Table(name = "regla_foro")
public class ReglaForo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    private int orden;
    public ReglaForo() {
    }

    public ReglaForo(String titulo, String descripcion, int orden) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.orden = orden;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getOrden() {
        return orden;
    }

    public void setOrden(int orden) {
        this.orden = orden;
    }


}
