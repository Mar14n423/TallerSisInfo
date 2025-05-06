package ucb.com.backendSinFront.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.HistorialPublicacion;

public interface HistorialPublicacionRepository extends JpaRepository<HistorialPublicacion, Long> {
  Page<HistorialPublicacion> findByIdEmpresaOrderByFechaAccionDesc(Long idEmpresa, Pageable pageable);
  Page<HistorialPublicacion> findAllByOrderByFechaAccionDesc(Pageable pageable);
}
