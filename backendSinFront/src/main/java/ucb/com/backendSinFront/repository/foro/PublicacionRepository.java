package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ucb.com.backendSinFront.entity.Publicacion;
import java.util.List;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {

  List<Publicacion> findByUsuario(String usuario);
}
