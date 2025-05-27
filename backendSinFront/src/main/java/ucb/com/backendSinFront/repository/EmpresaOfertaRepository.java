package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.EmpresaOferta;
import java.util.List;

public interface EmpresaOfertaRepository extends JpaRepository<EmpresaOferta, Long> {
  List<EmpresaOferta> findByIdEmpresa(Long idEmpresa);
}
