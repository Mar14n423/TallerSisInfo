package ucb.com.backendSinFront.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucb.com.backendSinFront.entity.Producto;
import ucb.com.backendSinFront.repository.ProductoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

  @Autowired
  private ProductoRepository productoRepository;

  public List<Producto> obtenerTodos() {
    return productoRepository.findAll();
  }

  public Optional<Producto> obtenerPorId(Long id) {
    return productoRepository.findById(id);
  }

  public Producto guardar(Producto producto) {
    return productoRepository.save(producto);
  }

  public void eliminar(Long id) {
    productoRepository.deleteById(id);
  }

  public Producto actualizarProducto(Long id, Producto productoActualizado) {
    return productoRepository.findById(id)
      .map(producto -> {
        producto.setNombreP(productoActualizado.getNombreP());
        producto.setPrecio(productoActualizado.getPrecio());
        producto.setDescripcionP(productoActualizado.getDescripcionP());
        producto.setCaracteristicasT(productoActualizado.getCaracteristicasT());
        if (productoActualizado.getImagenU() != null) {
          producto.setImagenU(productoActualizado.getImagenU());
        }
        return productoRepository.save(producto);
      })
      .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
  }
}
