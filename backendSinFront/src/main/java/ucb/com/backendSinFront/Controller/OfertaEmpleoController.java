package ucb.com.backendSinFront.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ucb.com.backendSinFront.entity.OfertaEmpleo;
import ucb.com.backendSinFront.service.OfertaEmpleoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ofertas")
@CrossOrigin(origins = "http://localhost:4200")
public class OfertaEmpleoController {

  @Autowired
  private OfertaEmpleoService service;

  @GetMapping
  public List<OfertaEmpleo> listar() {
    return service.listar();
  }

  @GetMapping("/{id}")
  public Optional<OfertaEmpleo> obtener(@PathVariable Long id) {
    return service.obtenerPorId(id);
  }

  //crear
  @PostMapping("/crear")
  public OfertaEmpleo crear(@RequestBody OfertaEmpleo oferta) {
    return service.crearOferta(oferta);
  }

  //eliminar
  @DeleteMapping("/{id}")
  public void eliminar(@PathVariable Long id) {
    service.eliminar(id);
  }

  @GetMapping("/filtrar/ubicacion/{ubicacion}")
  public List<OfertaEmpleo> filtrarUbicacion(@PathVariable String ubicacion) {
    return service.filtrarPorUbicacion(ubicacion);
  }

  @GetMapping("/filtrar/contrato/{tipo}")
  public List<OfertaEmpleo> filtrarContrato(@PathVariable String tipo) {
    return service.filtrarPorContrato(tipo);
  }

  @GetMapping("/filtrar/estado/{estado}")
  public List<OfertaEmpleo> filtrarEstado(@PathVariable String estado) {
    return service.filtrarPorEstado(estado);
  }
}
