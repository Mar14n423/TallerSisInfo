package ucb.com.backendSinFront.repository.foro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ucb.com.backendSinFront.entity.foro.Publicacion;

import java.util.List;
import org.springframework.data.domain.Pageable;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
  List<Publicacion> findByUsuario(String usuario);

  // Consulta personalizada para publicaciones con respuestas ordenadas por fecha
  @Query("SELECT p FROM Publicacion p WHERE SIZE(p.respuestas) > 0 ORDER BY p.fecha DESC")
  List<Publicacion> findTopPublicacionesWithRespuestasOrderedByDate(Pageable pageable);

}
