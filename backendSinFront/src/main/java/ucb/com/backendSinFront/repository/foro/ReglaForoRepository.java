package ucb.com.backendSinFront.repository.foro;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.foro.ReglaForo;
import java.util.List;

public interface ReglaForoRepository extends JpaRepository<ReglaForo, Long> {
  List<ReglaForo> findAllByOrderByOrdenAsc();
}
