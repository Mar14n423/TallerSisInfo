package ucb.com.backendSinFront.repository.foro;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// ✅ Import corregido:
import ucb.com.backendSinFront.entity.foro.Publicacion;

import java.util.List;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
  List<Publicacion> findByUsuario(String usuario);
}
