package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ucb.com.backendSinFront.entity.Respuesta;
import java.util.List;

@Repository
public interface RespuestaRepository extends JpaRepository<Respuesta, Long> {

  List<Respuesta> findByPublicacionId(Long publicacionId);
}
