package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.Evento;

import java.util.Date;
import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, String> {
  @Query("SELECT e FROM Evento e WHERE e.date BETWEEN :inicio AND :fin")
  List<Evento> findByDateBetween(@Param("inicio") Date inicio, @Param("fin") Date fin);
}
