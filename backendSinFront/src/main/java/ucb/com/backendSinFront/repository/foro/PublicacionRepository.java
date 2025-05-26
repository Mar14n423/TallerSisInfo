package ucb.com.backendSinFront.repository.foro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ucb.com.backendSinFront.entity.foro.Publicacion;
import java.util.List;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    List<Publicacion> findByUsuario(String usuario);

    @Query("SELECT p FROM Publicacion p WHERE SIZE(p.respuestas) > 0 ORDER BY p.fecha DESC LIMIT 3")
    List<Publicacion> findTop3WithRespuestas();
}