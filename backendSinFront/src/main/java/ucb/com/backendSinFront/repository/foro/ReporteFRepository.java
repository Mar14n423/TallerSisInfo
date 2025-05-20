package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.Reporte;
import java.util.List;

public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    List<Reporte> findByRevisadoFalse();
    List<Reporte> findByTipoAndContenidoId(Reporte.TipoContenido tipo, Long contenidoId);
}