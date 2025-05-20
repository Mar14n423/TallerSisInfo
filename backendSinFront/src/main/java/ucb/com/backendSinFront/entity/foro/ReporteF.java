package ucb.com.backendSinFront.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reporte")
public class Reporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private TipoContenido tipo;
    
    private Long contenidoId;
    private Long postPadreId; // Para comentarios
    private String usuarioReportador;
    private String razon;
    private String otraRazon;
    private LocalDateTime fecha;
    private boolean revisado;
    
    @ManyToOne
    @JoinColumn(name = "publicacion_id")
    private Publicacion publicacion;
    
    @ManyToOne
    @JoinColumn(name = "respuesta_id")
    private Respuesta respuesta;
    
    public enum TipoContenido {
        POST, COMENTARIO
    }
    
    // Getters y Setters
    // Constructor
}