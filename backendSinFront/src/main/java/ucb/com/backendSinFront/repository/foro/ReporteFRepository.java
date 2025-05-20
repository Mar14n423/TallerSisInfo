package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.ReporteF; 
import java.util.List;

public interface ReporteFRepository extends JpaRepository<ReporteF, Long> { 
    List<ReporteF> findByRevisadoFalse();
    List<ReporteF> findByTipoAndContenidoId(ReporteF.TipoContenido tipo, Long contenidoId);
}