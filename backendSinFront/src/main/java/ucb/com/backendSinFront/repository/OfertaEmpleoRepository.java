package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.OfertaEmpleo;
import java.util.List;

public interface OfertaEmpleoRepository extends JpaRepository<OfertaEmpleo, Long> {
  List<OfertaEmpleo> findByUbicacion(String ubicacion);
  List<OfertaEmpleo> findByTipoContrato(String tipoContrato);
  List<OfertaEmpleo> findByEstado(String estado);
}
