package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.EmpresaEmpleo;
import java.util.List;

public interface EmpresaEmpleoRepository extends JpaRepository<EmpresaEmpleo, Long> {
  List<EmpresaEmpleo> findByIdEmpresa(Long idEmpresa);
}
