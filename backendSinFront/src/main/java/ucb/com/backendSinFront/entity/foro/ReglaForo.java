package ucb.com.backendSinFront.entity;

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
    
    // Getters y Setters
    // Constructor
}