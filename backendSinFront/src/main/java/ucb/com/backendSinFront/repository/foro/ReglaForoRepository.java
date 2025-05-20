package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.ReglaForo;
import java.util.List;

public interface ReglaForoRepository extends JpaRepository<ReglaForo, Long> {
    List<ReglaForo> findAllByOrderByOrdenAsc();
}