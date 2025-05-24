package ucb.com.backendSinFront.repository.foro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ucb.com.backendSinFront.entity.foro.Respuesta; // ✅ Import corregido

import java.util.List;

@Repository
public interface RespuestaRepository extends JpaRepository<Respuesta, Long> {
  List<Respuesta> findByPublicacionId(Long publicacionId); // ✅ Corregí el nombre mal escrito
}
