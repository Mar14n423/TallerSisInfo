package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.Producto;
import ucb.com.backendSinFront.service.ProductoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

  @Autowired
  private ProductoService productoService;

  // Obtener todos los productos
  @GetMapping
  public List<Producto> obtenerProductos() {
    return productoService.obtenerTodos();
  }

  // Obtener producto por ID
  @GetMapping("/{id}")
  public Optional<Producto> obtenerProducto(@PathVariable Long id) {
    return productoService.obtenerPorId(id);
  }

  // Crear nuevo producto
  @PostMapping("/create")
  public Producto crearProducto(@RequestBody Producto producto) {
    // Validaciones básicas
    if (producto.getNombreP() == null || producto.getNombreP().trim().isEmpty()) {
      throw new RuntimeException("El nombre del producto no puede estar vacío");
    }
    if (producto.getPrecio() == null || producto.getPrecio() <= 0) {
      throw new RuntimeException("El precio debe ser mayor que cero");
    }

    return productoService.guardar(producto);
  }

  // Eliminar producto
  @DeleteMapping("/{id}")
  public void eliminarProducto(@PathVariable Long id) {
    productoService.eliminar(id);
  }

  // Actualizar producto completo
  @PutMapping("/{id}")
  public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
    return productoService.actualizarProducto(id, productoActualizado);
  }

  // Endpoint adicional para buscar productos por nombre (opcional)
  @GetMapping("/buscar")
  public ResponseEntity<List<Producto>> buscarPorNombre(@RequestParam String nombre) {
    List<Producto> productos = productoService.obtenerTodos()
      .stream()
      .filter(p -> p.getNombreP().toLowerCase().contains(nombre.toLowerCase()))
      .toList();
    return ResponseEntity.ok(productos);
  }

}
