package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {
}
