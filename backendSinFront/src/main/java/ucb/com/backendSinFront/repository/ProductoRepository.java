package ucb.com.backendSinFront.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ucb.com.backendSinFront.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
  // Puedes añadir métodos personalizados aquí si los necesitas
}
